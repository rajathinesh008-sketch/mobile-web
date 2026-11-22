/* ============================================================
   TECHNOVA — Product catalogue data
   NOTE: All products, prices, specifications and availability are
   illustrative demonstration data, not live catalogue information.
   Product visuals are stylized SVG illustrations, not photographs
   of specific real-world devices.
   ============================================================ */

const IMG = 'assets/images/';

const TECHNOVA_PRODUCTS = [
  {
    id: 'iphone-17-pro',
    brand: 'Apple',
    name: 'iPhone 17 Pro',
    price: 134900,
    oldPrice: 149900,
    rating: 4.9,
    reviews: 428,
    stock: 'in-stock',
    image: IMG + 'phone-iphone.svg',
    gallery: [IMG + 'phone-iphone.svg', IMG + 'phone-iphone-v2.svg', IMG + 'phone-iphone-v3.svg'],
    specs: ['6.3" OLED Display', 'A19 Pro Chip', '48MP Pro Camera', '5000 mAh Battery'],
    description: 'A flagship experience with a brilliant ProMotion display, pro-grade camera system and a power-efficient chip built for everything from gaming to filmmaking.',
    colors: [{ name: 'Titanium', hex: '#8b93a1' }, { name: 'Midnight', hex: '#1f2937' }, { name: 'Desert', hex: '#c8a27b' }],
    storage: ['256 GB', '512 GB', '1 TB'],
    highlights: [['Display', '6.3-inch Super Retina XDR OLED, 120Hz'], ['Processor', 'A19 Pro chip'], ['Camera', '48MP triple camera system'], ['Battery', 'Up to 5000 mAh, fast charging'], ['Build', 'Aerospace-grade titanium frame']]
  },
  {
    id: 'galaxy-s26-ultra',
    brand: 'Samsung',
    name: 'Galaxy S26 Ultra',
    price: 129999,
    oldPrice: 149999,
    rating: 4.8,
    reviews: 356,
    stock: 'in-stock',
    image: IMG + 'phone-samsung.svg',
    gallery: [IMG + 'phone-samsung.svg', IMG + 'phone-samsung-v2.svg', IMG + 'phone-samsung-v3.svg'],
    specs: ['6.9" AMOLED', 'Snapdragon 8 Elite', '200MP Camera', '5000 mAh Battery'],
    description: 'A large-edge-to-edge AMOLED canvas, an ultra-high-resolution camera and flagship performance make this a creator-friendly powerhouse.',
    colors: [{ name: 'Phantom Black', hex: '#252c39' }, { name: 'Titanium Gray', hex: '#6b7280' }, { name: 'Violet', hex: '#7c6bb0' }],
    storage: ['256 GB', '512 GB', '1 TB'],
    highlights: [['Display', '6.9-inch Dynamic AMOLED 2X, 120Hz'], ['Processor', 'Snapdragon 8 Elite'], ['Camera', '200MP main + periscope telephoto'], ['Battery', '5000 mAh with 45W charging'], ['Extras', 'Built-in S Pen support']]
  },
  {
    id: 'pixel-10-pro',
    brand: 'Google',
    name: 'Pixel 10 Pro',
    price: 109999,
    oldPrice: 124999,
    rating: 4.7,
    reviews: 289,
    stock: 'in-stock',
    image: IMG + 'phone-pixel.svg',
    gallery: [IMG + 'phone-pixel.svg', IMG + 'phone-pixel-v2.svg', IMG + 'phone-pixel-v3.svg'],
    specs: ['6.8" LTPO OLED', 'Tensor G5', '50MP Triple Cam', '5200 mAh Battery'],
    description: 'Pure Android, an intelligent Tensor chip and class-leading computational photography in a refined, sustainable design.',
    colors: [{ name: 'Porcelain', hex: '#d7dbe2' }, { name: 'Obsidian', hex: '#1f2937' }, { name: 'Lemongrass', hex: '#d9e59a' }],
    storage: ['128 GB', '256 GB', '512 GB'],
    highlights: [['Display', '6.8-inch LTPO OLED, 120Hz'], ['Processor', 'Google Tensor G5'], ['Camera', '50MP triple camera with AI features'], ['Battery', '5200 mAh, wireless charging'], ['Software', '7 years of security updates']]
  },
  {
    id: 'oneplus-15',
    brand: 'OnePlus',
    name: 'OnePlus 15',
    price: 72999,
    oldPrice: 84999,
    rating: 4.6,
    reviews: 512,
    stock: 'low-stock',
    image: IMG + 'phone-oneplus.svg',
    gallery: [IMG + 'phone-oneplus.svg', IMG + 'phone-oneplus-v2.svg', IMG + 'phone-oneplus-v3.svg'],
    specs: ['6.78" AMOLED', 'Snapdragon 8 Elite', '50MP Triple Cam', '7300 mAh Battery'],
    description: 'Built for speed: a high-refresh display, flagship silicon and a huge battery with blistering fast charging for all-day performance.',
    colors: [{ name: 'Midnight', hex: '#1e2734' }, { name: 'Sandstorm', hex: '#b08d5b' }, { name: 'Phantom Green', hex: '#3f6b54' }],
    storage: ['256 GB', '512 GB'],
    highlights: [['Display', '6.78-inch AMOLED, 165Hz'], ['Processor', 'Snapdragon 8 Elite'], ['Camera', '50MP triple camera with OIS'], ['Battery', '7300 mAh, 120W fast charging'], ['Cooling', 'Advanced vapour chamber']]
  },
  {
    id: 'xiaomi-17-pro',
    brand: 'Xiaomi',
    name: 'Xiaomi 17 Pro',
    price: 69999,
    oldPrice: 79999,
    rating: 4.5,
    reviews: 241,
    stock: 'in-stock',
    image: IMG + 'phone-xiaomi.svg',
    gallery: [IMG + 'phone-xiaomi.svg', IMG + 'phone-xiaomi-v2.svg', IMG + 'phone-xiaomi-v3.svg'],
    specs: ['6.7" AMOLED', 'Dimensity 9500', '50MP Leica Cam', '6000 mAh Battery'],
    description: 'Co-engineered camera optics, a vivid OLED display and a powerful silicon-anode battery deliver remarkable value in a premium body.',
    colors: [{ name: 'Gold', hex: '#c9a24d' }, { name: 'Black', hex: '#232323' }, { name: 'Green', hex: '#3f6b54' }],
    storage: ['256 GB', '512 GB'],
    highlights: [['Display', '6.7-inch AMOLED, 120Hz'], ['Processor', 'MediaTek Dimensity 9500'], ['Camera', '50MP Leica-tuned triple camera'], ['Battery', '6000 mAh, 100W charging'], ['Build', 'Premium metal mid-frame']]
  },
  {
    id: 'vivo-x300-pro',
    brand: 'Vivo',
    name: 'Vivo X300 Pro',
    price: 79999,
    oldPrice: 89999,
    rating: 4.6,
    reviews: 198,
    stock: 'in-stock',
    image: IMG + 'phone-vivo.svg',
    gallery: [IMG + 'phone-vivo.svg', IMG + 'phone-vivo-v2.svg', IMG + 'phone-vivo-v3.svg'],
    specs: ['6.78" AMOLED', 'Dimensity 9500', '200MP ZEISS Cam', '6000 mAh Battery'],
    description: 'A photography-first flagship with ZEISS optics, a colour-accurate display and outstanding battery life for creators on the move.',
    colors: [{ name: 'Sapphire', hex: '#1c2740' }, { name: 'Titanium', hex: '#7c8695' }, { name: 'Rose', hex: '#c98f96' }],
    storage: ['256 GB', '512 GB'],
    highlights: [['Display', '6.78-inch AMOLED, 120Hz'], ['Processor', 'MediaTek Dimensity 9500'], ['Camera', '200MP ZEISS telephoto system'], ['Battery', '6000 mAh, 90W charging'], ['Video', 'Cinematic 4K recording']]
  },
  {
    id: 'oppo-find-x9-pro',
    brand: 'OPPO',
    name: 'OPPO Find X9 Pro',
    price: 89999,
    oldPrice: 99999,
    rating: 4.7,
    reviews: 176,
    stock: 'low-stock',
    image: IMG + 'phone-oppo.svg',
    gallery: [IMG + 'phone-oppo.svg', IMG + 'phone-oppo-v2.svg', IMG + 'phone-oppo-v3.svg'],
    specs: ['6.78" AMOLED', 'Dimensity 9500', '50MP Hasselblad', '7500 mAh Battery'],
    description: 'Refined design meets a massive battery and Hasselblad-tuned cameras — a premium all-rounder with exceptional endurance.',
    colors: [{ name: 'Ocean', hex: '#2b8a94' }, { name: 'Silver', hex: '#cbd5e1' }, { name: 'Charcoal', hex: '#263043' }],
    storage: ['256 GB', '512 GB'],
    highlights: [['Display', '6.78-inch AMOLED, 120Hz'], ['Processor', 'MediaTek Dimensity 9500'], ['Camera', '50MP Hasselblad triple camera'], ['Battery', '7500 mAh, 80W charging'], ['Design', 'Slim curved-edge body']]
  },
  {
    id: 'nothing-phone-3',
    brand: 'Nothing',
    name: 'Nothing Phone (3)',
    price: 44999,
    oldPrice: 49999,
    rating: 4.4,
    reviews: 320,
    stock: 'in-stock',
    image: IMG + 'phone-nothing.svg',
    gallery: [IMG + 'phone-nothing.svg', IMG + 'phone-nothing-v2.svg', IMG + 'phone-nothing-v3.svg'],
    specs: ['6.7" OLED', 'Snapdragon 8s Gen 4', '50MP Triple Cam', '5000 mAh Battery'],
    description: 'A distinctive transparent design, clean Nothing OS and a Glyph interface make this a refreshing, design-led flagship alternative.',
    colors: [{ name: 'White', hex: '#d1d5db' }, { name: 'Black', hex: '#1f2937' }],
    storage: ['256 GB', '512 GB'],
    highlights: [['Display', '6.7-inch OLED, 120Hz'], ['Processor', 'Snapdragon 8s Gen 4'], ['Camera', '50MP triple camera'], ['Battery', '5000 mAh, 65W charging'], ['Design', 'Transparent Glyph interface']]
  }
];

const TECHNOVA_ACCESSORIES = [
  {
    id: 'studio-pro-earbuds', brand: 'Technova Audio', name: 'Studio Pro Wireless Earbuds',
    price: 4999, oldPrice: 6999, rating: 4.7, reviews: 214, stock: 'in-stock',
    category: 'Wireless Earbuds', image: IMG + 'acc-earbuds.svg',
    description: 'Rich, balanced sound with active noise cancellation and up to 32 hours of playback including the case.',
    specs: ['ANC', '32H Playback', 'Bluetooth 5.4'], colors: [{ name: 'White', hex: '#e2e8f0' }], storage: []
  },
  {
    id: 'pulsefit-watch-2', brand: 'Technova Wear', name: 'PulseFit Smart Watch 2',
    price: 8999, oldPrice: 12999, rating: 4.6, reviews: 178, stock: 'in-stock',
    category: 'Smart Watches', image: IMG + 'acc-watch.svg',
    description: 'A bright AMOLED display, accurate health tracking and 100+ sports modes in a lightweight everyday design.',
    specs: ['AMOLED', 'Health Tracking', '7-Day Battery'], colors: [{ name: 'Graphite', hex: '#334155' }], storage: []
  },
  {
    id: 'turbocharge-65w', brand: 'Technova Power', name: 'TurboCharge 65W GaN Charger',
    price: 2499, oldPrice: 3499, rating: 4.8, reviews: 402, stock: 'in-stock',
    category: 'Fast Chargers', image: IMG + 'acc-charger.svg',
    description: 'Compact GaN technology charges laptops, tablets and phones fast with intelligent power distribution.',
    specs: ['65W GaN', 'USB-C PD', 'Multi-Port'], colors: [{ name: 'White', hex: '#e2e8f0' }], storage: []
  },
  {
    id: 'powercore-20k', brand: 'Technova Power', name: 'PowerCore 20K Power Bank',
    price: 3499, oldPrice: 4499, rating: 4.5, reviews: 265, stock: 'in-stock',
    category: 'Power Banks', image: IMG + 'acc-powerbank.svg',
    description: 'A 20,000 mAh pocket powerhouse with fast charging and multiple ports for all your devices.',
    specs: ['20,000 mAh', '22.5W Output', 'Dual Port'], colors: [{ name: 'Midnight', hex: '#1e293b' }], storage: []
  },
  {
    id: 'soundbar-mini', brand: 'Technova Audio', name: 'SoundBar Mini Bluetooth Speaker',
    price: 3999, oldPrice: 5499, rating: 4.4, reviews: 143, stock: 'in-stock',
    category: 'Bluetooth Speakers', image: IMG + 'acc-speaker.svg',
    description: 'Punchy 360° sound, deep bass and water resistance make this speaker perfect for home and travel.',
    specs: ['360° Sound', 'IPX7', '12H Playback'], colors: [{ name: 'Slate', hex: '#334155' }], storage: []
  },
  {
    id: 'armorshield-case', brand: 'Technova Care', name: 'ArmorShield Protective Case',
    price: 1499, oldPrice: 2499, rating: 4.3, reviews: 389, stock: 'in-stock',
    category: 'Phone Cases', image: IMG + 'acc-case.svg',
    description: 'Slim, transparent protection with raised edges and a precise camera cutout for everyday drop defence.',
    specs: ['Shock Absorbing', 'Transparent', 'Raised Edges'], colors: [{ name: 'Clear', hex: '#93c5fd' }], storage: []
  }
];

const TECHNOVA_REVIEWS = [
  { name: 'Ananya Rao', avatar: IMG + 'avatar-a1.svg', rating: 5, product: 'iPhone 17 Pro', text: 'Absolutely premium experience from browsing to delivery. The phone feels fantastic and the whole process was smooth.' },
  { name: 'Priya Sharma', avatar: IMG + 'avatar-a2.svg', rating: 5, product: 'Galaxy S26 Ultra', text: 'Loved the packaging and the quick dispatch. Great value for a flagship device and the support team answered all my questions.' },
  { name: 'Karthik Mehta', avatar: IMG + 'avatar-a3.svg', rating: 4, product: 'OnePlus 15', text: 'Fast charging is a game changer. The catalogue made it easy to compare specs and pick the right storage option for me.' },
  { name: 'Jiya Thomas', avatar: IMG + 'avatar-a4.svg', rating: 5, product: 'Studio Pro Earbuds', text: 'The earbuds sound incredible for the price. Delivery was quick and the ordering flow was simple on my phone.' },
  { name: 'Rohan Verma', avatar: IMG + 'avatar-a1.svg', rating: 5, product: 'Nothing Phone (3)', text: 'Unique design and a clean interface. I appreciate how transparent the pricing and specifications were before buying.' },
  { name: 'Sneha Iyer', avatar: IMG + 'avatar-a2.svg', rating: 4, product: 'PulseFit Smart Watch 2', text: 'Comfortable to wear all day and the battery easily lasts a week. A solid addition to my tech setup.' }
];
