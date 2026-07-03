// Site-level content: hero choreography, editorial copy, gallery, contact.
// Copy follows the brand voice guide: gracious host, Title Case headlines,
// one elegant sentence of support, no hard sell.

import heroImg from "../../assets/img/hero.jpg";
import rentalsImg from "../../assets/img/rentals.jpg";
import homeImg from "../../assets/img/home.jpg";
import dijanImg from "../../assets/img/dijan.jpg";
import hamtonImg from "../../assets/img/hamton.jpg";
import lilacImg from "../../assets/img/lilac.jpg";
import taupeImg from "../../assets/img/taupe.jpg";
import willowImg from "../../assets/img/willow.jpg";

export const images = {
  hero: heroImg,
  rentals: rentalsImg,
  home: homeImg,
  dijan: dijanImg,
  hamton: hamtonImg,
  lilac: lilacImg,
  taupe: taupeImg,
  willow: willowImg,
};

export const contact = {
  phone: "718-790-1832",
  phoneHref: "tel:+17187901832",
  whatsapp: "https://wa.me/17187901832",
  email: "sequintable@gmail.com",
  instagram: "https://www.instagram.com/sequin.table/",
  hours: [
    { days: "Sunday – Thursday", time: "10:00 AM – 6:00 PM" },
    { days: "Friday", time: "10:00 AM – 1:00 PM" },
  ],
  area: "Brooklyn, with white-glove delivery across New York & New Jersey.",
};

/** The noir stage — each slide pairs a cloth cutout with a room tint. */
export type HeroSlide = {
  productId: string;
  image: string;
  tint: string;
};

export const heroSlides: HeroSlide[] = [
  { productId: "home-lisbon-white", image: "/hero3d/lisbon-ribbed-white.png", tint: "#46564c" },
  { productId: "home-willow", image: "/hero3d/willow-quilted.png", tint: "#4b5434" },
  { productId: "home-flutter", image: "/hero3d/flutter-overlay.png", tint: "#6b4a33" },
  { productId: "home-doria-eyelet", image: "/hero3d/doria-eyelet.png", tint: "#54303c" },
];

export const testimonials = [
  {
    quote:
      "The tables looked like they belonged in a magazine. Guests kept touching the linen before they would sit down.",
    who: "R. Friedman",
    where: "Wedding · Williamsburg",
  },
  {
    quote:
      "Everything arrived pressed, wrapped, and ready. I set a table for forty and it took me twenty minutes.",
    who: "M. Gluck",
    where: "Sheva Brachos · Boro Park",
  },
  {
    quote:
      "Sequin is the first call I make after the hall is booked. The linen sets the room before a single flower arrives.",
    who: "D. Weiss",
    where: "Event Planner · Lakewood",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  occasion: "Weddings" | "Dinner Parties" | "Shabbos & Yom Tov" | "At Home";
};

export const galleryItems: GalleryItem[] = [
  { src: heroImg, alt: "White ribbed linen with gold flatware and bordeaux roses in a conservatory", occasion: "Dinner Parties" },
  { src: rentalsImg, alt: "Long banquet table dressed in patterned linen with tall florals", occasion: "Weddings" },
  { src: homeImg, alt: "Lace-dressed table with white seating and marble accents", occasion: "Shabbos & Yom Tov" },
  { src: dijanImg, alt: "Layered neutral tablescape with textured linen", occasion: "At Home" },
  { src: hamtonImg, alt: "Lattice overlay on a garden-party table", occasion: "Dinner Parties" },
  { src: lilacImg, alt: "Soft lilac florals over crisp white linen", occasion: "Weddings" },
  { src: taupeImg, alt: "Taupe pendant lace catching the afternoon light", occasion: "At Home" },
  { src: willowImg, alt: "Willow quilted cloth set for an intimate dinner", occasion: "Shabbos & Yom Tov" },
  { src: "/products/golden-hour-striped.jpg", alt: "Golden hour striped linen in warm light", occasion: "Dinner Parties" },
  { src: "/products/hamptons-lattice-overlay.jpg", alt: "Hamptons lattice overlay, styled", occasion: "Weddings" },
  { src: "/products/lisbon-ribbed-rose.jpg", alt: "Lisbon ribbed linen in rose", occasion: "At Home" },
  { src: "/products/astoria-butter-sage-scalloped-topper.jpg", alt: "Astoria scalloped topper in butter and sage", occasion: "Shabbos & Yom Tov" },
];

export const galleryOccasions = ["All", "Weddings", "Dinner Parties", "Shabbos & Yom Tov", "At Home"] as const;

/** Accordion copy for product pages, keyed by intent. */
export const productCare = {
  details: [
    "Woven and finished for tables that get used, not just admired.",
    "Colors are photographed in natural light; small variations are part of the character of the cloth.",
  ],
  careHome: [
    "Machine wash cold on gentle, or spot-clean.",
    "Hang or lay flat to dry; a warm iron on the reverse brings the finish back.",
    "Stain-resistant weaves shrug off most of dinner — blot, don't rub.",
  ],
  careRental: [
    "We handle all cleaning and pressing — return the linen as it leaves the table.",
    "Candle wax, wine, and life happen; ordinary wear is expected and covered.",
  ],
  delivery: [
    "White-glove delivery across Brooklyn, New York & New Jersey.",
    "Every piece arrives pressed, wrapped, and ready to lay.",
    "Home linen ships nationwide within 3–5 business days.",
  ],
  rentalTerms: [
    "Reserve with your event date; we confirm availability within one business day.",
    "Delivery and pickup are scheduled around your venue's timing.",
    "Quotes are tailored to table count and sizes — no flat fees for linen you don't use.",
  ],
};

export const homeCopy = {
  heroEyebrow: "Brooklyn Linen House",
  heroTitleA: "Upscale Table Linen for",
  heroTitleAccent: "Every",
  heroTitleB: "Celebration",
  heroSub: "Linen to rent for the occasion — or own for always. Pressed, wrapped, and delivered ready to lay.",
  twoWaysEyebrow: "Two Ways to Sequin",
  twoWaysTitle: "Rent for the Event. Own for the Table.",
  featuredEyebrow: "The Collection",
  featuredTitle: "Pieces Worth Setting",
  editorialQuote: "A table is the first thing a guest remembers.",
  editorialLine: "Every Sequin piece is chosen and finished in our Brooklyn studio — made to dress the moments worth remembering.",
  stepsEyebrow: "How It Works",
  stepsTitle: "Set Your Table in Three Steps",
  steps: [
    {
      title: "Choose the Linen",
      line: "Browse the collection, or send us your venue and vision — we'll suggest the pieces.",
    },
    {
      title: "We Press, Wrap & Deliver",
      line: "Every cloth arrives finished and ready to lay, timed to your event or your doorstep.",
    },
    {
      title: "Celebrate",
      line: "Rentals are picked up when the evening ends. The compliments, you keep.",
    },
  ],
  quotesEyebrow: "From Our Tables",
  quotesTitle: "Word Travels From Table to Table",
  igEyebrow: "Follow Along on Instagram",
  igTitle: "sequin.table",
  closingEyebrow: "Begin Here",
  closingTitle: "Set the Table for Something Memorable",
  closingLine: "Tell us the date and the room — we'll bring the linen that makes it.",
};
