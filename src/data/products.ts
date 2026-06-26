export type ProductCollection = "Home Linens" | "Rentals";
export type ProductCategory =
  | "Tablecloths"
  | "Overlays"
  | "Quilted"
  | "Velvet"
  | "Napkins"
  | "Napkin Rings"
  | "Toppers"
  | "Textured";

export type Product = {
  id: string;
  title: string;
  handle: string;
  collection: ProductCollection;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  variants: string[];
  tags: string[];
  palette: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "home-flutter",
    title: "The Flutter Overlay",
    handle: "the-flutter-overlay",
    collection: "Home Linens",
    category: "Overlays",
    price: 168,
    image: "/products/the-flutter-overlay.jpg",
    palette: "#c89962",
    featured: true,
    tags: ["butterfly", "lace", "white", "overlay", "event"],
    variants: ["54x72", "60x84", "60x96", "72x108", "72x120", "72x144", "72x180", "72x204"],
    description:
      "White lace with delicate taupe threads and a soft butterfly detail. A light, graceful overlay for elevated gatherings.",
  },
  {
    id: "home-lisbon-cream",
    title: "Lisbon Ribbed Cream",
    handle: "lisbon-ribbed",
    collection: "Home Linens",
    category: "Velvet",
    price: 170,
    image: "/products/lisbon-ribbed.jpg",
    palette: "#d7c4a5",
    featured: true,
    tags: ["cream", "ribbed", "velvet", "neutral", "machine washable"],
    variants: ["54x72", "60x90", "72x108", "72x120", "72x132", "72x144", "72x180", "72x204"],
    description:
      "A plush ribbed velvet in warm cream. The dimensional lines bring a polished modern texture to a classic tablescape.",
  },
  {
    id: "home-lisbon-white",
    title: "Lisbon Ribbed White",
    handle: "lisbon-ribbed-white",
    collection: "Home Linens",
    category: "Velvet",
    price: 170,
    image: "/products/lisbon-ribbed-white.jpg",
    palette: "#f3eee6",
    featured: true,
    tags: ["white", "ribbed", "velvet", "fresh", "wedding"],
    variants: ["54x72", "60x90", "72x108", "72x120", "72x132", "72x144", "72x180", "72x204"],
    description:
      "Pure white ribbed velvet with a fresh, tailored finish. Crisp enough for a wedding, soft enough for home.",
  },
  {
    id: "home-willow",
    title: "Willow Quilted",
    handle: "willow-quilted",
    collection: "Home Linens",
    category: "Quilted",
    price: 170,
    image: "/products/willow-quilted.jpg",
    palette: "#9fa482",
    featured: true,
    tags: ["quilted", "taupe stitch", "velvet", "washable", "soft"],
    variants: ["54x72", "60x90", "72x108", "72x120", "72x132", "72x144", "72x180", "72x204", "72x220"],
    description:
      "A plush quilted tablecloth with taupe stitching and a calm, tailored texture. Stain resistant and machine washable.",
  },
  {
    id: "home-paloma-white",
    title: "Paloma Quilted White",
    handle: "untitled-aug19_22-58",
    collection: "Home Linens",
    category: "Quilted",
    price: 170,
    image: "/products/untitled-aug19_22-58.jpg",
    palette: "#e6ded0",
    tags: ["white", "quilted", "flower stitch", "velvet"],
    variants: ["52x70", "60x90", "72x108", "72x120", "72x132", "72x144", "72x180", "72x204"],
    description:
      "Luxurious plush velvet with a stitched floral pattern. A soft white foundation with enough detail to feel special.",
  },
  {
    id: "home-doria-eyelet",
    title: "Doria Eyelet Tablecloth",
    handle: "doria-eyelet-tablecloth",
    collection: "Home Linens",
    category: "Overlays",
    price: 168,
    image: "/products/doria-eyelet-tablecloth.jpg",
    palette: "#f4ede4",
    tags: ["eyelet", "white", "modern", "lace", "liner"],
    variants: ["54x72", "60x84", "60x96", "72x108", "72x120", "72x132", "72x144", "72x180", "72x204"],
    description:
      "A modern white eyelet with a distinctive pattern. Layer it over a lining shade and change the mood by occasion.",
  },
  {
    id: "home-pendant-white",
    title: "White Pendant Lace",
    handle: "pendant-lace",
    collection: "Home Linens",
    category: "Overlays",
    price: 168,
    image: "/products/pendant-lace.jpg",
    palette: "#ece4d9",
    tags: ["lace", "white", "taupe option", "overlay"],
    variants: ["52x70", "60x90", "72x108", "72x120", "72x144", "72x168", "72x180", "72x204"],
    description:
      "A refined pendant lace available across dining sizes. Elegant over white, warm over taupe, and easy to dress up.",
  },
  {
    id: "home-hamptons",
    title: "Hamptons Lattice Overlay",
    handle: "hampton-lattice-overlay",
    collection: "Home Linens",
    category: "Overlays",
    price: 168,
    image: "/products/hampton-lattice-overlay.jpg",
    palette: "#d7c7b8",
    tags: ["lattice", "overlay", "lace", "coastal", "white"],
    variants: ["52x70", "60x90", "72x108", "72x120", "72x144", "72x168", "72x180", "72x204"],
    description:
      "A lattice overlay with a clean, airy repeat. It brings a Hamptons polish to Shabbos, weddings, and summer hosting.",
  },
  {
    id: "home-taupe-pendant",
    title: "Taupe Pendant Lace",
    handle: "taupe-pendant-lace-1",
    collection: "Home Linens",
    category: "Overlays",
    price: 168,
    image: "/products/taupe-pendant-lace-1.jpg",
    palette: "#b49984",
    tags: ["taupe", "lace", "overlay", "warm neutral"],
    variants: ["52x70", "72x108", "72x120", "72x144", "72x168", "72x180"],
    description:
      "Pendant lace in a warm taupe shade for tables that want texture without feeling bright white.",
  },
  {
    id: "home-taupe-velvet",
    title: "Taupe Velvet",
    handle: "nude-velvet",
    collection: "Home Linens",
    category: "Velvet",
    price: 125,
    image: "/products/nude-velvet.jpg",
    palette: "#a1816a",
    tags: ["velvet", "taupe", "neutral", "soft"],
    variants: ["72x108", "72x120", "72x132", "72x144", "72x168", "72x180", "72x204"],
    description:
      "A versatile taupe velvet that softens the table and pairs well with gold, cream, greenery, and dark florals.",
  },
  {
    id: "home-topaz-gold",
    title: "Topaz Gold Napkin",
    handle: "topaz-gold-napkins",
    collection: "Home Linens",
    category: "Napkins",
    price: 4.99,
    image: "/products/topaz-gold-napkins.jpg",
    palette: "#d4a64d",
    tags: ["napkin", "gold", "topaz", "accent"],
    variants: ["Default"],
    description:
      "A golden napkin accent with a polished finish. Small enough to layer, strong enough to set the tone.",
  },
  {
    id: "home-topaz-blush",
    title: "Topaz Blush Napkin",
    handle: "topaz-blush-napkins",
    collection: "Home Linens",
    category: "Napkins",
    price: 4.99,
    image: "/products/topaz-blush-napkins.jpg",
    palette: "#d3a0a0",
    tags: ["napkin", "blush", "topaz", "pink"],
    variants: ["Default"],
    description:
      "A soft blush napkin for warm, romantic place settings and spring tables.",
  },
  {
    id: "home-hemstitched",
    title: "Natural Hemstitched Napkins",
    handle: "linen-hemstitched-napkins",
    collection: "Home Linens",
    category: "Napkins",
    price: 19.99,
    image: "/products/linen-hemstitched-napkins.jpg",
    palette: "#c6b08d",
    tags: ["napkin", "linen", "natural", "set of 4"],
    variants: ["Set of 4"],
    description:
      "A natural hemstitched napkin set for everyday refinement and easy layering with textured linens.",
  },
  {
    id: "rental-dolce-flutter",
    title: "Dolce Flutter Overlay",
    handle: "dolce-flutter-overlay",
    collection: "Rentals",
    category: "Overlays",
    price: 0,
    image: "/products/dolce-flutter-overlay.jpg",
    palette: "#c79a70",
    featured: true,
    tags: ["rental", "butterfly", "lace", "overlay", "white"],
    variants: ["96 square", "120 square", "108x156"],
    description:
      "A soft white butterfly overlay with taupe-threaded detail. Reserved for events that need a graceful statement layer.",
  },
  {
    id: "rental-hamptons",
    title: "Hamptons Lattice Overlay",
    handle: "hamptons-lattice-overlay",
    collection: "Rentals",
    category: "Overlays",
    price: 0,
    image: "/products/hamptons-lattice-overlay.jpg",
    palette: "#bba189",
    tags: ["rental", "lattice", "overlay", "lace"],
    variants: ["Inquire"],
    description:
      "A tailored lattice overlay for a clean, polished event table with a little dimension.",
  },
  {
    id: "rental-doria-eyelet",
    title: "Doria White Eyelet Overlay",
    handle: "doria-white-eyelet-overlay",
    collection: "Rentals",
    category: "Overlays",
    price: 0,
    image: "/products/doria-white-eyelet-overlay.jpg",
    palette: "#ebe2d5",
    tags: ["rental", "eyelet", "white", "overlay"],
    variants: ["Inquire"],
    description:
      "White eyelet with a modern pattern, made for layered event tables and custom liner pairings.",
  },
  {
    id: "rental-white-pendant",
    title: "White Pendant Lace",
    handle: "white-pendant-lace",
    collection: "Rentals",
    category: "Overlays",
    price: 0,
    image: "/products/white-pendant-lace.jpg",
    palette: "#e9dfd0",
    tags: ["rental", "white", "lace", "overlay"],
    variants: ["Inquire"],
    description:
      "White pendant lace for receptions, holidays, and formal events that need delicate texture.",
  },
  {
    id: "rental-taupe-pendant",
    title: "Taupe Pendant Lace",
    handle: "taupe-pendant-lace",
    collection: "Rentals",
    category: "Overlays",
    price: 0,
    image: "/products/taupe-pendant-lace.jpg",
    palette: "#af8f76",
    tags: ["rental", "taupe", "lace", "warm"],
    variants: ["Inquire"],
    description:
      "A taupe lace overlay for warmer palettes, especially with ivory florals and champagne metals.",
  },
  {
    id: "rental-astoria",
    title: "Astoria Butter/Sage Scalloped Topper",
    handle: "astoria-butter-sage-scalloped-topper",
    collection: "Rentals",
    category: "Toppers",
    price: 0,
    image: "/products/astoria-butter-sage-scalloped-topper.jpg",
    palette: "#d9c980",
    tags: ["rental", "scalloped", "embroidered", "sage", "topper"],
    variants: ["54x54", "75x75", "95x95", "72x126"],
    description:
      "A crisp white topper with butter and sage scalloped edges and embroidered floral bundles.",
  },
  {
    id: "rental-desert-plaid",
    title: "Desert Plaid",
    handle: "desert-plaid",
    collection: "Rentals",
    category: "Tablecloths",
    price: 0,
    image: "/products/desert-plaid.jpg",
    palette: "#b37858",
    tags: ["rental", "plaid", "warm", "casual"],
    variants: ["Inquire"],
    description:
      "A warm plaid tablecloth for relaxed celebrations, outdoor events, and layered neutral palettes.",
  },
  {
    id: "rental-windowpane",
    title: "Soft Blue Windowpane",
    handle: "soft-blue-windowpane",
    collection: "Rentals",
    category: "Tablecloths",
    price: 0,
    image: "/products/soft-blue-windowpane.jpg",
    palette: "#91a6b5",
    tags: ["rental", "blue", "windowpane", "pattern"],
    variants: ["Inquire"],
    description:
      "Soft blue windowpane linen for a fresh patterned table that still feels quiet and refined.",
  },
  {
    id: "rental-golden-hour",
    title: "Golden Hour Striped",
    handle: "golden-hour-striped",
    collection: "Rentals",
    category: "Tablecloths",
    price: 0,
    image: "/products/golden-hour-striped.jpg",
    palette: "#c3924b",
    tags: ["rental", "gold", "stripe", "warm"],
    variants: ["Inquire"],
    description:
      "Warm striped linen with a candlelit mood. A natural fit for late-day events and layered gold details.",
  },
  {
    id: "rental-white-boucle",
    title: "White Boucle",
    handle: "white-boucle",
    collection: "Rentals",
    category: "Textured",
    price: 0,
    image: "/products/white-boucle.jpg",
    palette: "#e8e0d5",
    tags: ["rental", "boucle", "textured", "white"],
    variants: ["Inquire"],
    description:
      "A white boucle texture that brings soft dimension to minimal tables and monochrome event palettes.",
  },
  {
    id: "rental-lisbon-cream",
    title: "Lisbon Ribbed Cream",
    handle: "lisbon-ribbed-1",
    collection: "Rentals",
    category: "Velvet",
    price: 0,
    image: "/products/lisbon-ribbed-1.jpg",
    palette: "#d8c7a6",
    tags: ["rental", "cream", "ribbed", "velvet"],
    variants: ["108x156", "120 square"],
    description:
      "The Lisbon ribbed texture in cream, available for events that need a soft but dimensional neutral.",
  },
  {
    id: "rental-espresso-ribbed",
    title: "Lisbon Ribbed Espresso Brown",
    handle: "espresso-brown-ribbed",
    collection: "Rentals",
    category: "Velvet",
    price: 0,
    image: "/products/espresso-brown-ribbed.jpg",
    palette: "#4a2f25",
    tags: ["rental", "espresso", "brown", "ribbed", "velvet"],
    variants: ["Inquire"],
    description:
      "A rich espresso ribbed velvet for dramatic evening tables and deep floral palettes.",
  },
  {
    id: "rental-mint-ribbed",
    title: "Ribbed Velvet Mint Green",
    handle: "lisbon-ribbed-sage-green",
    collection: "Rentals",
    category: "Velvet",
    price: 0,
    image: "/products/lisbon-ribbed-sage-green.jpg",
    palette: "#8b9d80",
    tags: ["rental", "mint", "sage", "ribbed", "velvet"],
    variants: ["Inquire"],
    description:
      "A sage-mint ribbed velvet that brings color while staying soft and event-friendly.",
  },
  {
    id: "rental-rose-ribbed",
    title: "Lisbon Ribbed Rose",
    handle: "lisbon-ribbed-rose",
    collection: "Rentals",
    category: "Velvet",
    price: 0,
    image: "/products/lisbon-ribbed-rose.jpg",
    palette: "#be8584",
    tags: ["rental", "rose", "ribbed", "velvet", "pink"],
    variants: ["Inquire"],
    description:
      "A rose ribbed velvet for romantic events, baby celebrations, and floral tablescapes.",
  },
  {
    id: "rental-paloma",
    title: "Paloma Quilted Tablecloth",
    handle: "paloma-quilted-tablecloth",
    collection: "Rentals",
    category: "Quilted",
    price: 0,
    image: "/products/paloma-quilted-tablecloth.jpg",
    palette: "#d8cfc2",
    tags: ["rental", "quilted", "white", "velvet"],
    variants: ["108x156", "120 square", "132 round", "96 square"],
    description:
      "Plush quilted velvet with a taupe stitched flower design. A refined rental favorite for soft white tables.",
  },
  {
    id: "rental-willow",
    title: "Willow Quilted",
    handle: "willow-quilted-1",
    collection: "Rentals",
    category: "Quilted",
    price: 0,
    image: "/products/willow-quilted-1.jpg",
    palette: "#a5ab88",
    tags: ["rental", "quilted", "willow", "velvet"],
    variants: ["108x156", "120 square"],
    description:
      "A taupe-stitched quilted velvet with a tailored, hospitable finish.",
  },
  {
    id: "rental-ennis",
    title: "Ennis White Quilted",
    handle: "ennis-white-quilted",
    collection: "Rentals",
    category: "Quilted",
    price: 0,
    image: "/products/ennis-white-quilted.jpg",
    palette: "#e4ded5",
    tags: ["rental", "white", "quilted", "classic"],
    variants: ["Inquire"],
    description:
      "A classic white quilted linen for clean, soft, and dimensional event tables.",
  },
  {
    id: "rental-blue-toile",
    title: "Blue Toile Napkin",
    handle: "blue-toile-napkin",
    collection: "Rentals",
    category: "Napkins",
    price: 0,
    image: "/products/blue-toile-napkin.jpg",
    palette: "#5d7f99",
    tags: ["rental", "napkin", "blue", "toile"],
    variants: ["Inquire"],
    description:
      "A blue toile napkin that brings pattern and charm to neutral linens and white tableware.",
  },
  {
    id: "rental-bee-ring",
    title: "Daisy Bee Napkin Ring Cream",
    handle: "bee-napkin-ring",
    collection: "Rentals",
    category: "Napkin Rings",
    price: 0,
    image: "/products/bee-napkin-ring.png",
    palette: "#d6bc77",
    tags: ["rental", "napkin ring", "bee", "daisy", "gold"],
    variants: ["Inquire"],
    description:
      "A cream daisy napkin ring with gold accents and a small bee detail for a charming finish.",
  },
  {
    id: "rental-gold-moss",
    title: "Gold Bar Collection Moss Green",
    handle: "gold-bar-collection-moss-green",
    collection: "Rentals",
    category: "Napkin Rings",
    price: 0,
    image: "/products/gold-bar-collection-moss-green.jpg",
    palette: "#657253",
    tags: ["rental", "napkin ring", "moss", "gold"],
    variants: ["Inquire"],
    description:
      "A moss green napkin ring with a gold bar accent, made for natural palettes and candlelit tables.",
  },
  {
    id: "rental-acrylic-black",
    title: "Acrylic Collection Classic Black",
    handle: "acrylic-collection-classic-black",
    collection: "Rentals",
    category: "Napkin Rings",
    price: 0,
    image: "/products/acrylic-collection-classic-black.jpg",
    palette: "#1b1716",
    tags: ["rental", "napkin ring", "black", "acrylic"],
    variants: ["Inquire"],
    description:
      "A classic black acrylic napkin ring for high-contrast settings and modern event tables.",
  },
  {
    id: "rental-gold-blush",
    title: "Gold Bar Collection Blush Champagne",
    handle: "gold-bar-collection-opal-pink",
    collection: "Rentals",
    category: "Napkin Rings",
    price: 0,
    image: "/products/gold-bar-collection-opal-pink.jpg",
    palette: "#c89188",
    tags: ["rental", "napkin ring", "blush", "champagne", "gold"],
    variants: ["Inquire"],
    description:
      "A blush champagne napkin ring with a gold bar accent for soft romantic palettes.",
  },
];

export const categories: ProductCategory[] = [
  "Tablecloths",
  "Overlays",
  "Quilted",
  "Velvet",
  "Napkins",
  "Napkin Rings",
  "Toppers",
  "Textured",
];

export const featuredProducts = products.filter((product) => product.featured);

export const productUrl = (product: Product) => `https://sequintable.com/products/${product.handle}`;

export const formatPrice = (product: Product) =>
  product.price > 0 ? `From $${product.price.toFixed(product.price % 1 === 0 ? 0 : 2)}` : "Inquire";
