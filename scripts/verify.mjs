// QA harness: screenshots every page at 3 breakpoints, checks for
// horizontal overflow (the release blocker), and exercises both
// checkout branches — card payment and rentals-only quote.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://127.0.0.1:4173";
const OUT = "screenshots/v5";
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 834, height: 1100 },
  { name: "mobile", width: 390, height: 844 },
];
const pages = [
  { path: "/", name: "home" },
  { path: "/shop", name: "shop" },
  { path: "/rentals", name: "rentals" },
  { path: "/gallery", name: "gallery" },
  { path: "/contact", name: "contact" },
  { path: "/cart", name: "cart-empty" },
  { path: "/story", name: "story" },
  { path: "/product/willow-quilted", name: "pdp-shop" },
  { path: "/product/golden-hour-striped", name: "pdp-rental" },
];

const problems = [];
const consoleErrors = [];

const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[${vp.name}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`[${vp.name}] pageerror: ${err.message}`));

  for (const p of pages) {
    await page.goto(BASE + p.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    // scroll through the page like a reader so scroll-reveals fire
    // (instant behavior — the site's smooth scrolling would lag the loop)
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 140));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(900);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return { scrollW: doc.scrollWidth, clientW: doc.clientWidth };
    });
    if (overflow.scrollW > overflow.clientW + 1) {
      problems.push(`OVERFLOW ${vp.name} ${p.path}: scrollWidth ${overflow.scrollW} > ${overflow.clientW}`);
    }
    await page.screenshot({ path: `${OUT}/${p.name}-${vp.name}.png`, fullPage: true });
  }
  await ctx.close();
}

/* ---------- flow 1: buy home linen, pay by card ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (err) => consoleErrors.push(`[flow-pay] pageerror: ${err.message}`));

  await page.goto(BASE + "/product/willow-quilted", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/flow-1-drawer.png` });
  await page.getByRole("button", { name: /Review Cart/i }).click();
  await page.waitForURL("**/cart");
  await page.screenshot({ path: `${OUT}/flow-2-cart.png`, fullPage: true });
  await page.getByRole("button", { name: /Continue to Checkout/i }).click();
  await page.waitForURL("**/checkout");

  await page.fill("#co-name", "Meilech Tester");
  await page.fill("#co-phone", "718-555-0101");
  await page.fill("#co-email", "test@example.com");
  await page.fill("#co-address", "123 Bedford Ave");
  await page.fill("#co-city", "Brooklyn");
  await page.fill("#co-zip", "11211");

  // wrong card first — expect the Luhn error to appear
  await page.fill("#co-card", "4242424242424241");
  await page.fill("#co-exp", "1229");
  await page.fill("#co-cvc", "123");
  await page.getByRole("button", { name: /Pay \$/i }).click();
  await page.waitForTimeout(300);
  const luhnError = await page.locator(".field-error").count();
  if (luhnError === 0) problems.push("PAYMENT: invalid card was accepted (Luhn check failed to fire)");
  await page.screenshot({ path: `${OUT}/flow-3-payment-error.png`, fullPage: true });

  // now the valid test card
  await page.fill("#co-card", "4242424242424242");
  const brand = await page.locator(".card-brand").textContent();
  if (brand !== "Visa") problems.push(`PAYMENT: brand detection expected Visa, got "${brand}"`);
  await page.screenshot({ path: `${OUT}/flow-4-payment-filled.png`, fullPage: true });
  await page.getByRole("button", { name: /Pay \$/i }).click();
  await page.waitForURL("**/order/**", { timeout: 8000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/flow-5-confirmation.png`, fullPage: true });
  const confirm = await page.textContent("body");
  if (!confirm.includes("Visa")) problems.push("CONFIRMATION: paid card summary missing");
  await ctx.close();
}

/* ---------- flow 2: rentals only → quote request ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (err) => consoleErrors.push(`[flow-quote] pageerror: ${err.message}`));

  await page.goto(BASE + "/product/golden-hour-striped", { waitUntil: "networkidle" });
  // date is required for rentals — try without first
  await page.getByRole("button", { name: "Add to Quote" }).click();
  await page.waitForTimeout(200);
  if ((await page.locator(".field-error").count()) === 0) {
    problems.push("RENTAL: add-to-quote without a date did not ask for one");
  }
  await page.fill("#event-date", "2026-09-15");
  await page.getByRole("button", { name: "Add to Quote" }).click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: /Review Cart/i }).click();
  await page.waitForURL("**/cart");
  await page.screenshot({ path: `${OUT}/flow-6-quote-cart.png`, fullPage: true });
  await page.getByRole("button", { name: /Request the Quote/i }).click();
  await page.waitForURL("**/checkout");
  const hasCardField = await page.locator("#co-card").count();
  if (hasCardField > 0) problems.push("QUOTE FLOW: card field shown on a rentals-only checkout");
  await page.fill("#co-name", "Quote Tester");
  await page.fill("#co-phone", "718-555-0102");
  await page.fill("#co-email", "quote@example.com");
  await page.fill("#co-address", "456 Lee Ave");
  await page.fill("#co-city", "Brooklyn");
  await page.fill("#co-zip", "11206");
  await page.screenshot({ path: `${OUT}/flow-7-quote-checkout.png`, fullPage: true });
  await page.getByRole("button", { name: /Send Quote Request/i }).click();
  await page.waitForURL("**/order/**", { timeout: 8000 });
  await page.screenshot({ path: `${OUT}/flow-8-quote-confirmation.png`, fullPage: true });
  await ctx.close();
}

/* ---------- flow 3: mobile refine drawer + search suggestions ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/shop", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Refine/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/flow-9-refine-sheet.png` });
  await ctx.close();

  const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page2 = await ctx2.newPage();
  await page2.goto(BASE + "/shop", { waitUntil: "networkidle" });
  await page2.getByRole("button", { name: "Search the collection" }).click();
  await page2.fill(".search-pop input", "velvet");
  await page2.waitForTimeout(300);
  const suggestions = await page2.locator(".search-suggest-item").count();
  if (suggestions === 0) problems.push("SEARCH: no live suggestions for 'velvet'");
  await page2.screenshot({ path: `${OUT}/flow-10-search-suggest.png` });
  await ctx2.close();
}

await browser.close();

console.log("=== QA RESULT ===");
console.log(problems.length === 0 ? "No layout/flow problems detected." : problems.join("\n"));
if (consoleErrors.length) {
  console.log("--- console errors ---");
  console.log([...new Set(consoleErrors)].slice(0, 20).join("\n"));
} else {
  console.log("No console errors.");
}
