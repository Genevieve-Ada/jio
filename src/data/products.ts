export type CategoryKey = 'All' | 'Lighting' | 'Furniture' | 'Wall Art';
export type ColorFamily = 'All' | 'Terracotta & Clay' | 'Natural Wood' | 'Warm Sand' | 'Charcoal & Stone' | 'Mineral Slate';
export type ProductSize = 'Small' | 'Medium' | 'Large';

export interface ProductSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  descriptor: string;
  image: string;
  category: Exclude<CategoryKey, 'All'>;
  colorFamily: Exclude<ColorFamily, 'All'>;
  size: ProductSize;
  inStock: boolean;
  swatches: [ProductSwatch, ProductSwatch];
  page: number;
  featuredSlot?: 'top-right' | 'bottom-left';
  materials: string;
  dimensions: string;
  leadTime: string;
  description: string;
  isNewArrival?: boolean;
}

/**
 * The 10 primary showcase items rendered on Page 1 in the signature asymmetric
 * editorial layout (matching the curated product list showcase).
 */
export const PRIMARY_PRODUCTS: Product[] = [
  {
    id: 'minimalist-ceramic-vase',
    name: 'Minimalist Ceramic Vase',
    price: 46.99,
    descriptor: 'Sleek & versatile',
    image: '/images/minimalist-ceramic-vase.jpg',
    category: 'Wall Art',
    colorFamily: 'Terracotta & Clay',
    size: 'Small',
    inStock: true,
    swatches: [
      { name: 'Warm Sand', hex: '#93836b' },
      { name: 'Terracotta Glaze', hex: '#853318' },
    ],
    page: 1,
    materials: 'Hand-thrown stoneware clay, matte mineral slip & kiln glaze',
    dimensions: '24 cm H × 11 cm Ø',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Wheel-thrown in small batches, this two-tone sculptural vessel pairs a raw matte sandstone cylinder over a glossy terracotta dome base for single-stem botanical displays.',
    isNewArrival: true,
  },
  {
    id: 'handwoven-textured',
    name: 'Handwoven Textured',
    price: 26.49,
    descriptor: 'Cozy & eco-friendly',
    image: '/images/handwoven-textured.jpg',
    category: 'Furniture',
    colorFamily: 'Warm Sand',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Charcoal Ink', hex: '#1c1816' },
      { name: 'Roasted Chestnut', hex: '#762b02' },
    ],
    page: 1,
    materials: '100% GOTS organic cotton weave, recycled kapok insert',
    dimensions: '45 cm × 45 cm',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Loom-woven cushion cover featuring bold abstract color-block geometry in earth pigments. Tactile slubbed cotton softens seating nooks while staying naturally breathable.',
    isNewArrival: true,
  },
  {
    id: 'abstract-wall-print',
    name: 'Abstract Wall Print',
    price: 25.49,
    descriptor: 'Refined & personality',
    image: '/images/abstract-wall-print.jpg',
    category: 'Wall Art',
    colorFamily: 'Terracotta & Clay',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Natural Ash Frame', hex: '#e8d9c1' },
      { name: 'Burnt Sienna Print', hex: '#ba5215' },
    ],
    page: 1,
    materials: '310 gsm archival cotton rag paper, FSC solid oak frame',
    dimensions: '40 cm × 50 cm (framed)',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Botanical gouache study reproduced with archival pigment inks on deckled museum rag paper. Framed in raw unbleached oak with anti-reflective gallery glass.',
  },
  {
    id: 'wooden-accent-tray',
    name: 'Wooden Accent Tray',
    price: 64.9,
    descriptor: 'Functional & stylish',
    image: '/images/wooden-accent-tray.jpg',
    category: 'Furniture',
    colorFamily: 'Natural Wood',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Smoked Walnut', hex: '#380701' },
      { name: 'Natural Teak', hex: '#9d775b' },
    ],
    page: 1,
    materials: 'Solid reclaimed acacia wood, food-safe beeswax oil finish',
    dimensions: '42 cm L × 26 cm W × 11 cm H',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Architectural footed serving tray with sculpted side handles and gently splayed legs. Ideal for organizing morning tea rituals, books, and tabletop curios.',
    isNewArrival: true,
  },
  {
    id: 'sculptural-wooden-lamp',
    name: 'Sculptural Wooden Lamp',
    price: 59.99,
    descriptor: 'Warm & Ambient',
    image: '/images/sculptural-wooden-lamp.jpg',
    category: 'Lighting',
    colorFamily: 'Natural Wood',
    size: 'Large',
    inStock: true,
    swatches: [
      { name: 'Raw Birch', hex: '#ad9176' },
      { name: 'Oiled Cherrywood', hex: '#7c300a' },
    ],
    page: 1,
    featuredSlot: 'top-right',
    materials: 'Steam-bent walnut rib frame, hand-stretched linen diffuser',
    dimensions: '52 cm H × 28 cm W × 22 cm D',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'An organic ribbon of steam-bent timber cradles a translucent pleated linen shade, casting a warm 2700K amber glow across bedside tables and quiet reading corners.',
    isNewArrival: true,
  },
  {
    id: 'ceramic-vase',
    name: 'Ceramic Vase',
    price: 20.0,
    descriptor: 'Leather & Walnut',
    image: '/images/ceramic-vase.jpg',
    category: 'Wall Art',
    colorFamily: 'Charcoal & Stone',
    size: 'Large',
    inStock: true,
    swatches: [
      { name: 'Sienna Clay', hex: '#864126' },
      { name: 'Charred Umber', hex: '#4a2211' },
    ],
    page: 1,
    featuredSlot: 'bottom-left',
    materials: 'Hand-coiled dark stoneware clay, high-gloss obsidian neck glaze',
    dimensions: '31 cm H × 18 cm Ø',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Hand-built organic stoneware amphora showcasing subtle thumb impressions and a matte raw-earth body crowned with a dipped glossy volcanic glaze.',
  },
  {
    id: 'eco-candle-holder',
    name: 'Eco Candle Holder',
    price: 15.0,
    descriptor: 'Marble & Stainless Steel',
    image: '/images/eco-candle-holder.jpg',
    category: 'Lighting',
    colorFamily: 'Natural Wood',
    size: 'Small',
    inStock: true,
    swatches: [
      { name: 'Brushed Brass', hex: '#c4a761' },
      { name: 'Dark Walnut', hex: '#513628' },
    ],
    page: 1,
    materials: 'Turned walnut wood cups, recycled brushed brass arc stem',
    dimensions: '22 cm H × 13 cm W',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Minimalist dual-arm sculptural candelabra balancing asymmetric turned-wood cups on a slender hand-bent brass wire anchored to a weighted hardwood plinth.',
    isNewArrival: true,
  },
  {
    id: 'organic-cotton-rug',
    name: 'Organic Cotton Rug',
    price: 40.0,
    descriptor: 'Wool & Cashmere',
    image: '/images/organic-cotton-rug.jpg',
    category: 'Furniture',
    colorFamily: 'Mineral Slate',
    size: 'Large',
    inStock: true,
    swatches: [
      { name: 'Mineral Slate', hex: '#577d80' },
      { name: 'Ochre Terracotta', hex: '#ae5e32' },
    ],
    page: 1,
    materials: 'Unbleached organic cotton warp, hand-tufted botanical motifs',
    dimensions: '140 cm × 200 cm',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Flat-woven artisan kilim finished with hand-knotted fringe and delicate embroidered foliage in mineral blue and rust tones dyed with natural plant extracts.',
  },
  {
    id: 'recycled-paper-print',
    name: 'Recycled Paper Print',
    price: 85.0,
    descriptor: 'Sustainable Bamboo',
    image: '/images/recycled-paper-print.jpg',
    category: 'Wall Art',
    colorFamily: 'Charcoal & Stone',
    size: 'Small',
    inStock: false,
    swatches: [
      { name: 'Slate Charcoal', hex: '#2d3434' },
      { name: 'Sumi Obsidian', hex: '#100c0b' },
    ],
    page: 1,
    materials: 'Handmade 100% post-consumer cotton & bamboo rag sheets',
    dimensions: '26 cm × 34 cm (set of 2 editions)',
    leadTime: 'Made to order — ships in 5–7 business days',
    description:
      'Tactile deckle-edge linocut editions pulled by hand onto heavy charcoal-dyed handmade paper. Each numbered sheet carries distinct organic fiber texture.',
  },
  {
    id: 'reclaimed-wood-stool',
    name: 'Reclaimed Wood Stool',
    price: 75.0,
    descriptor: 'Marble & Stainless Steel',
    image: '/images/reclaimed-wood-stool.jpg',
    category: 'Furniture',
    colorFamily: 'Natural Wood',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Sunbleached Pine', hex: '#ecbe97' },
      { name: 'Reclaimed Oak', hex: '#724621' },
    ],
    page: 1,
    materials: 'Salvaged barn oak timber, mortise-and-tenon joinery',
    dimensions: '46 cm H × 32 cm seat Ø',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Three-legged heirloom stool carved from weathered reclaimed oak planks. Doubles effortlessly as an organic plant pedestal or sculptural bedside perch.',
  },
];

/**
 * Spotlight hero product featured in the chartreuse-yellow Artisan banner.
 */
export const ARTISAN_CHAIR_PRODUCT: Product = {
  id: 'artisan-wooden-chair',
  name: 'Artisan Wooden Chair',
  price: 185.0,
  descriptor: 'Handcrafted sustainable ash',
  image: '/images/artisan-wooden-chair.jpg',
  category: 'Furniture',
  colorFamily: 'Natural Wood',
  size: 'Large',
  inStock: true,
  swatches: [
    { name: 'Warm Honey Ash', hex: '#b67d4b' },
    { name: 'Smoked Walnut', hex: '#51321e' },
  ],
  page: 1,
  materials: 'FSC-certified steam-bent European ash, natural linseed oil finish',
  dimensions: '82 cm H × 48 cm W × 50 cm D',
  leadTime: 'In stock — ships within 4 business days',
  description:
    'Add a touch of handmade charm to your home with this sturdy, eco-friendly wooden chair. Shaped by hand using traditional steam-bending joinery and sealed in low-VOC botanical oil for generations of everyday comfort.',
  isNewArrival: true,
};

/**
 * Additional catalog pages (Pages 2–5) so pagination and category views
 * provide a deep, responsive shopping catalog while Page 1 remains 100%
 * faithful to the signature editorial curation.
 */
const SECONDARY_PRODUCTS: Product[] = [
  // Page 2
  {
    id: 'solstice-linen-lamp',
    name: 'Solstice Bentwood Lamp',
    price: 78.0,
    descriptor: 'Warm & Ambient',
    image: '/images/sculptural-wooden-lamp.jpg',
    category: 'Lighting',
    colorFamily: 'Natural Wood',
    size: 'Large',
    inStock: true,
    swatches: [
      { name: 'Amber Walnut', hex: '#8e4a22' },
      { name: 'Natural Linen', hex: '#e5d5be' },
    ],
    page: 2,
    featuredSlot: 'top-right',
    materials: 'Hand-bent walnut arch, raw organic linen shade',
    dimensions: '56 cm H × 30 cm W',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Gallery edition floor-and-console accent lamp casting diffused evening warmth through hand-stitched Belgian linen.',
  },
  {
    id: 'terracotta-duo-vessel',
    name: 'Terracotta Duo Vessel',
    price: 52.0,
    descriptor: 'Hand-thrown stoneware',
    image: '/images/minimalist-ceramic-vase.jpg',
    category: 'Wall Art',
    colorFamily: 'Terracotta & Clay',
    size: 'Small',
    inStock: true,
    swatches: [
      { name: 'Ochre Sand', hex: '#b29b82' },
      { name: 'Kiln Rust', hex: '#9c3e1b' },
    ],
    page: 2,
    materials: 'Fired terracotta stoneware, satin matte finish',
    dimensions: '26 cm H × 12 cm Ø',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Stacked-silhouette floral vessel crafted for minimalist mantels and sunlit window ledges.',
  },
  {
    id: 'brass-balance-taper',
    name: 'Brass Balance Taper Holder',
    price: 29.0,
    descriptor: 'Recycled brass & oak',
    image: '/images/eco-candle-holder.jpg',
    category: 'Lighting',
    colorFamily: 'Natural Wood',
    size: 'Small',
    inStock: true,
    swatches: [
      { name: 'Aged Brass', hex: '#c4a761' },
      { name: 'Espresso Oak', hex: '#43281b' },
    ],
    page: 2,
    materials: 'Recycled solid brass wire, turned walnut pedestals',
    dimensions: '24 cm H × 14 cm W',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Architectural dual taper holder bringing balanced sculptural height to dining tables.',
  },
  {
    id: 'botanical-gouache-study',
    name: 'Botanical Gouache Study',
    price: 38.0,
    descriptor: 'Archival cotton rag',
    image: '/images/abstract-wall-print.jpg',
    category: 'Wall Art',
    colorFamily: 'Terracotta & Clay',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Warm Birch', hex: '#dfcfb7' },
      { name: 'Persimmon', hex: '#c45b1b' },
    ],
    page: 2,
    materials: 'Cotton rag fine-art paper, sustainably harvested ash frame',
    dimensions: '45 cm × 60 cm',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Limited edition floral study capturing autumn terracotta blooms against pale plaster tones.',
  },
  {
    id: 'atelier-serving-plinth',
    name: 'Atelier Serving Plinth',
    price: 72.0,
    descriptor: 'Oiled solid acacia',
    image: '/images/wooden-accent-tray.jpg',
    category: 'Furniture',
    colorFamily: 'Natural Wood',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Deep Teak', hex: '#4b1a09' },
      { name: 'Honey Oak', hex: '#a98160' },
    ],
    page: 2,
    materials: 'Hand-planed acacia hardwood, brass dowel joinery',
    dimensions: '46 cm L × 28 cm W',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Elevated coffee-table organizer and tea tray with softly chamfered handles.',
  },
  {
    id: 'obsidian-amphora-vase',
    name: 'Obsidian Amphora Vase',
    price: 34.0,
    descriptor: 'Raw earth & glaze',
    image: '/images/ceramic-vase.jpg',
    category: 'Wall Art',
    colorFamily: 'Charcoal & Stone',
    size: 'Large',
    inStock: true,
    swatches: [
      { name: 'Umber Clay', hex: '#683924' },
      { name: 'Obsidian', hex: '#231915' },
    ],
    page: 2,
    featuredSlot: 'bottom-left',
    materials: 'Wood-fired dark clay, hand-dipped neck glaze',
    dimensions: '34 cm H × 19 cm Ø',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Statement dried-botanical floor and credenza vessel formed from iron-rich dark stoneware.',
  },
  {
    id: 'loom-block-pillow',
    name: 'Loom Block Throw Pillow',
    price: 32.0,
    descriptor: 'Organic slub cotton',
    image: '/images/handwoven-textured.jpg',
    category: 'Furniture',
    colorFamily: 'Warm Sand',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Espresso', hex: '#241814' },
      { name: 'Cinnamon', hex: '#8b3e12' },
    ],
    page: 2,
    materials: 'Hand-loomed organic cotton, feather-free natural fill',
    dimensions: '50 cm × 50 cm',
    leadTime: 'In stock — ships within 2 business days',
    description:
      'Graphic modernist cushion woven by cooperative artisans using low-impact earth dyes.',
  },
  {
    id: 'meadow-fringed-kilim',
    name: 'Meadow Fringed Kilim',
    price: 58.0,
    descriptor: 'Hand-embroidered cotton',
    image: '/images/organic-cotton-rug.jpg',
    category: 'Furniture',
    colorFamily: 'Mineral Slate',
    size: 'Large',
    inStock: false,
    swatches: [
      { name: 'Fjord Blue', hex: '#577d80' },
      { name: 'Spiced Clay', hex: '#ae5e32' },
    ],
    page: 2,
    materials: 'Unbleached heavy cotton weave, natural mineral pigments',
    dimensions: '160 cm × 230 cm',
    leadTime: 'Made to order — ships in 6 business days',
    description:
      'Generously proportioned woven area rug featuring stitched botanical motifs and braided fringe.',
  },
  {
    id: 'deckle-charcoal-folio',
    name: 'Deckle Charcoal Folio',
    price: 92.0,
    descriptor: 'Handmade bamboo paper',
    image: '/images/recycled-paper-print.jpg',
    category: 'Wall Art',
    colorFamily: 'Charcoal & Stone',
    size: 'Small',
    inStock: true,
    swatches: [
      { name: 'Graphite', hex: '#373e3e' },
      { name: 'Basalt', hex: '#141110' },
    ],
    page: 2,
    materials: 'Recycled rag pulp & sustainable bamboo fibers',
    dimensions: '28 cm × 36 cm',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Pair of tactile monochrome relief prints pulled onto heavy deckled artisan sheets.',
  },
  {
    id: 'hearth-timber-stool',
    name: 'Hearth Timber Stool',
    price: 84.0,
    descriptor: 'Salvaged barn oak',
    image: '/images/reclaimed-wood-stool.jpg',
    category: 'Furniture',
    colorFamily: 'Natural Wood',
    size: 'Medium',
    inStock: true,
    swatches: [
      { name: 'Bleached Elm', hex: '#e2b790' },
      { name: 'Weathered Oak', hex: '#6c411e' },
    ],
    page: 2,
    materials: '100% reclaimed heritage oak timber',
    dimensions: '48 cm H × 33 cm Ø',
    leadTime: 'In stock — ships within 3 business days',
    description:
      'Richly grained solid wood side stool highlighting decades of authentic natural patina.',
  },
];

// Generate Pages 3, 4, 5 curated studio editions so all 5 pagination pages are fully populated
const PAGE_EDITION_META: Record<number, { suffix: string; priceOffset: number }> = {
  3: { suffix: 'Atelier Edition', priceOffset: 8 },
  4: { suffix: 'Gallery Reserve', priceOffset: 14 },
  5: { suffix: 'Archive Series', priceOffset: 5 },
};

const EXTRA_PAGES: Product[] = [3, 4, 5].flatMap((pageNum) => {
  const { suffix, priceOffset } = PAGE_EDITION_META[pageNum];
  // Rotate order subtly on later pages so each page feels freshly curated
  const rotated = [
    ...PRIMARY_PRODUCTS.slice((pageNum - 1) % PRIMARY_PRODUCTS.length),
    ...PRIMARY_PRODUCTS.slice(0, (pageNum - 1) % PRIMARY_PRODUCTS.length),
  ];
  return rotated.map((base, idx) => ({
    ...base,
    id: `${base.id}-p${pageNum}`,
    name: `${base.name} — ${suffix.split(' ')[0]}`,
    price: Number((base.price + priceOffset + (idx % 3) * 2).toFixed(2)),
    page: pageNum,
    featuredSlot: idx === 4 ? 'top-right' : idx === 5 ? 'bottom-left' : undefined,
  }));
});

export const ALL_PRODUCTS: Product[] = [...PRIMARY_PRODUCTS, ...SECONDARY_PRODUCTS, ...EXTRA_PAGES];
export const TOTAL_CATALOG_COUNT = 121;
