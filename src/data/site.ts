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

export type GalleryOccasion = "Weddings" | "Dinner Parties" | "Shabbos & Yom Tov" | "At Home";

export type GalleryItem = {
  src: string;
  alt: string;
  occasion: GalleryOccasion;
  /** The cloth on the table — shown in the caption. */
  cloth: string;
  /** Links the look to a piece in the collection, when it's carried. */
  productHandle?: string;
};

export const galleryItems: GalleryItem[] = [
  { src: heroImg, alt: "White ribbed linen with gold flatware and bordeaux roses in a conservatory", occasion: "Dinner Parties", cloth: "Lisbon Ribbed White", productHandle: "lisbon-ribbed-white" },
  { src: rentalsImg, alt: "Long banquet table dressed in patterned linen with tall florals", occasion: "Weddings", cloth: "Golden Hour Striped", productHandle: "golden-hour-striped" },
  { src: homeImg, alt: "Lace-dressed table with white seating and marble accents", occasion: "Shabbos & Yom Tov", cloth: "White Pendant Lace", productHandle: "pendant-lace" },
  { src: dijanImg, alt: "Layered neutral tablescape with textured linen", occasion: "At Home", cloth: "Taupe Velvet", productHandle: "nude-velvet" },
  { src: hamtonImg, alt: "Lattice overlay on a garden-party table", occasion: "Dinner Parties", cloth: "Hamptons Lattice Overlay", productHandle: "hampton-lattice-overlay" },
  { src: lilacImg, alt: "Soft lilac florals over crisp white linen", occasion: "Weddings", cloth: "The Flutter Overlay", productHandle: "the-flutter-overlay" },
  { src: taupeImg, alt: "Taupe pendant lace catching the afternoon light", occasion: "At Home", cloth: "Taupe Pendant Lace", productHandle: "taupe-pendant-lace-1" },
  { src: willowImg, alt: "Willow quilted cloth set for an intimate dinner", occasion: "Shabbos & Yom Tov", cloth: "Willow Quilted", productHandle: "willow-quilted" },
  { src: "/products/golden-hour-striped.jpg", alt: "Golden hour striped linen in warm light", occasion: "Dinner Parties", cloth: "Golden Hour Striped", productHandle: "golden-hour-striped" },
  { src: "/products/hamptons-lattice-overlay.jpg", alt: "Hamptons lattice overlay, styled", occasion: "Weddings", cloth: "Hamptons Lattice Overlay", productHandle: "hamptons-lattice-overlay" },
  { src: "/products/lisbon-ribbed-rose.jpg", alt: "Lisbon ribbed linen in rose", occasion: "At Home", cloth: "Lisbon Ribbed Rose", productHandle: "lisbon-ribbed-rose" },
  { src: "/products/astoria-butter-sage-scalloped-topper.jpg", alt: "Astoria scalloped topper in butter and sage", occasion: "Shabbos & Yom Tov", cloth: "Astoria Scalloped Topper", productHandle: "astoria-butter-sage-scalloped-topper" },
];

export const galleryOccasions = ["All", "Weddings", "Dinner Parties", "Shabbos & Yom Tov", "At Home"] as const;

/** Occasion accents — the quiet use of the wider palette. */
export const occasionAccent: Record<GalleryOccasion, string> = {
  Weddings: "#be9a6e",
  "Dinner Parties": "#6a2635",
  "Shabbos & Yom Tov": "#8fa5b5",
  "At Home": "#8d9874",
};

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
  heroTitleA: "Linen That",
  heroTitleAccent: "Dresses",
  heroTitleB: "the Room",
  heroSub: "Rent it for the event, or own it for always — pressed, wrapped, and delivered ready to lay.",
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
