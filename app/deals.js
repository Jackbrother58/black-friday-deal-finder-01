/* Deal data for Deal Ember. Every price below was read on Nov 27, 2026 from
   the store or deals source named in `source`. Sale and usual prices are in
   US dollars. The discount shown on the site is computed from the two
   prices, never typed in by hand. */
export const CHECKED = "Nov 27, 2026, 2:30 PM WIB";
export const CHECKED_SHORT = "Nov 27, 2026";

export const CATEGORIES = [
  { id: "tv", label: "TV & Audio", blurb: "Big screens and soundbars for the living room." },
  { id: "laptops", label: "Laptops & PC", blurb: "MacBooks, Windows laptops and PC parts." },
  { id: "headphones", label: "Headphones", blurb: "Noise cancelling, earbuds and speakers." },
  { id: "smarthome", label: "Smart Home", blurb: "Streaming sticks, doorbells and mesh wifi." },
  { id: "gaming", label: "Gaming", blurb: "Consoles, controllers and the games themselves." },
  { id: "kitchen", label: "Kitchen & Home", blurb: "Vacuums, air fryers and stand mixers." },
  { id: "toys", label: "Toys", blurb: "LEGO sets and starter sets for younger players." },
  { id: "wearables", label: "Wearables & Tablets", blurb: "Watches, tablets and e-readers." },
];

export const STORES = [
  { name: "Amazon", host: "www.amazon.com", kind: "search" },
  { name: "Best Buy", host: "www.bestbuy.com", kind: "search" },
  { name: "Walmart", host: "www.walmart.com", kind: "search" },
  { name: "Target", host: "www.target.com", kind: "search" },
  { name: "Dell", host: "www.dell.com", kind: "search" },
  { name: "Woot", host: "www.woot.com", kind: "search" },
  { name: "PlayStation Direct", host: "direct.playstation.com", kind: "search" },
];

export const DEALS = [
  {
    id: "hisense-qd5-98", name: "Hisense 98-inch QD5 Hi-QLED 4K Fire TV", store: "Best Buy",
    cat: "tv", sale: 799.99, was: 2499.99, verdict: "strong",
    evidence: "Doorbuster at $1,700 off the comparable value.",
    source: "daily.slickdeals.net", note: "98-inch screen, Fire TV built in.",
  },
  {
    id: "hisense-qd5-55", name: "Hisense 55-inch QD5 Hi-QLED 4K Roku TV", store: "Best Buy",
    cat: "tv", sale: 179.99, was: 379.99, verdict: "strong",
    evidence: "$200 off the comparable value for a bedroom-size 4K set.",
    source: "daily.slickdeals.net", note: "Roku TV built in, good second-room size.",
  },
  {
    id: "lg-c6-65", name: "LG C6 65-inch OLED evo 4K TV", store: "Best Buy",
    cat: "tv", sale: 1399.99, was: 2699.99, verdict: "strong",
    evidence: "Nearly half off a current OLED panel.",
    source: "montgomerydailynews.com", note: "OLED evo panel, 65-inch.",
  },
  {
    id: "hisense-e7-65", name: "Hisense 65-inch E7 Mini-LED Hi-QLED 4K TV", store: "Amazon",
    cat: "tv", sale: 499.99, was: 999.99, verdict: "strong",
    evidence: "Listed as saving $500 at Amazon.",
    source: "thesunreport.com", note: "Mini-LED backlight at a mid-range price.",
  },
  {
    id: "roku-oled-65", name: "Roku 65-inch OLED Pro Series 4K Smart RokuTV", store: "Amazon",
    cat: "tv", sale: 799.99, was: 1199.99, verdict: "strong",
    evidence: "$400 off the list price at Amazon.",
    source: "thesunreport.com", note: "OLED panel with Roku built in.",
  },
  {
    id: "sony-bravia6-65", name: "Sony BRAVIA 6 65-inch OLED 4K TV", store: "Amazon",
    cat: "tv", sale: 1198, was: 1999.99, verdict: "strong",
    evidence: "Tracked at $1,198 against a $1,999.99 list price.",
    source: "petematheson.com", note: "Sony OLED, 65-inch.",
  },
  {
    id: "tcl-65-fire", name: "TCL 65-inch 4K UHD HDR Smart TV with Fire TV", store: "Best Buy",
    cat: "tv", sale: 229.99, was: 469.99, verdict: "strong",
    evidence: "$240 off in the Best Buy Black Friday sale.",
    source: "beebulletin.com", note: "Fire TV built in, 65-inch.",
  },
  {
    id: "insignia-f50-55", name: "Insignia 55-inch F50 Series 4K Fire TV", store: "Best Buy",
    cat: "tv", sale: 169.99, was: 349.99, verdict: "strong",
    evidence: "About half off the list price.",
    source: "montgomerydailynews.com", note: "Budget 55-inch 4K with Alexa remote.",
  },
  {
    id: "vizio-soundbar", name: "VIZIO 5.1 Dolby Atmos Soundbar System", store: "Walmart",
    cat: "tv", sale: 99, was: 198, verdict: "strong",
    evidence: "Half off the $198 list price at Walmart.",
    source: "daily.slickdeals.net", note: "5.1 channels with Dolby Atmos.",
  },
  {
    id: "sonos-arc-ultra", name: "Sonos Arc Ultra Soundbar with Dolby Atmos", store: "Amazon",
    cat: "tv", sale: 849, was: 1099, verdict: "strong",
    evidence: "$250 off the list price at Amazon.",
    source: "slickdeals.net", note: "Flagship Sonos soundbar.",
  },
];

export const DEALS_LAPTOPS = [
  {
    id: "macbook-air-m5-amazon", name: "Apple MacBook Air 13-inch M5, 16GB RAM, 512GB SSD", store: "Amazon",
    cat: "laptops", sale: 999, was: 1299, verdict: "strong", group: "macbook-air-m5",
    evidence: "$300 off the list price; the lowest MacBook Air M5 price in the roundup.",
    source: "techspot.com", note: "Current M5 chip, 512GB storage.",
  },
  {
    id: "macbook-air-m5-bestbuy", name: "Apple MacBook Air 13-inch M5, 16GB RAM, 512GB SSD", store: "Best Buy",
    cat: "laptops", sale: 1049, was: 1299, verdict: "strong", group: "macbook-air-m5",
    evidence: "$250 off the $1,299 comparison price at Best Buy.",
    source: "montgomerydailynews.com", note: "Same model as the Amazon listing; compare before buying.",
  },
  {
    id: "macbook-neo", name: "Apple MacBook Neo 256GB SSD, 8GB RAM", store: "Amazon",
    cat: "laptops", sale: 599, was: 700, verdict: "routine",
    evidence: "$100 off the list price; a modest cut on the budget MacBook.",
    source: "techspot.com", note: "Apple's cheapest laptop, fine for basic use.",
  },
  {
    id: "dell-xps-13", name: "Dell XPS 13 with Core 5 320, 8GB RAM, 256GB SSD", store: "Dell",
    cat: "laptops", sale: 549, was: 750, verdict: "strong",
    evidence: "$201 off the list price direct from Dell.",
    source: "techspot.com", note: "Thin ultraportable, 13-inch.",
  },
  {
    id: "hp-omnibook5", name: "HP OmniBook 5 14-inch with 2K OLED Touchscreen, Core 5 320", store: "Best Buy",
    cat: "laptops", sale: 449, was: 800, verdict: "strong",
    evidence: "$351 off; an OLED screen at this price is rare.",
    source: "techspot.com", note: "2K OLED touchscreen, 8GB RAM, 256GB SSD.",
  },
  {
    id: "hp-omnibook3", name: "HP OmniBook 3 15-inch Laptop", store: "Best Buy",
    cat: "laptops", sale: 549.99, was: 749.99, verdict: "strong",
    evidence: "$200 off the list price at Best Buy.",
    source: "montgomerydailynews.com", note: "Everyday 15-inch laptop.",
  },
  {
    id: "macbook-pro14-m6", name: "Apple MacBook Pro 14-inch M6, 16GB RAM, 1TB SSD", store: "Amazon",
    cat: "laptops", sale: 1779, was: 1999, verdict: "routine",
    evidence: "$220 off; a real cut, but small next to the Air deals.",
    source: "techspot.com", note: "Pro chip with 1TB storage.",
  },
  {
    id: "mac-mini-m6", name: "Apple Mac Mini M6, 16GB RAM, 256GB SSD", store: "Amazon",
    cat: "laptops", sale: 779, was: 899, verdict: "routine",
    evidence: "$120 off the list price.",
    source: "techspot.com", note: "Desktop Mac, bring your own screen.",
  },
  {
    id: "surface-laptop7", name: "Microsoft Surface Laptop 7, Snapdragon X Elite, 16GB, 256GB", store: "Amazon",
    cat: "laptops", sale: 899, was: 1370, verdict: "strong",
    evidence: "$471 off the list price.",
    source: "techspot.com", note: "ARM-based Windows laptop with long battery life.",
  },
  {
    id: "alienware-16", name: "Alienware 16 Aurora Gaming Laptop, RTX 5060, 16GB, 1TB SSD", store: "Amazon",
    cat: "laptops", sale: 1339, was: 1450, verdict: "routine",
    evidence: "$111 off; gaming laptops are barely discounted this year.",
    source: "techspot.com", note: "RTX 5060 graphics, 120Hz screen.",
  },
];

export const DEALS_AUDIO = [
  {
    id: "airpods-pro-3", name: "Apple AirPods Pro 3", store: "Amazon",
    cat: "headphones", sale: 149, was: 249, verdict: "new-low",
    evidence: "New low: $100 off, the only time they have fallen below $169.",
    source: "cnn.com", note: "Best true wireless earbuds for iPhone owners.",
  },
  {
    id: "sony-xm5", name: "Sony WH-1000XM5 Wireless Headphones", store: "Best Buy",
    cat: "headphones", sale: 169.99, was: 398, verdict: "new-low",
    evidence: "Record-low price at Best Buy, $228 off.",
    source: "montgomerydailynews.com", note: "Flagship noise cancelling, previous generation.",
  },
  {
    id: "bose-qc2", name: "Bose QuietComfort Headphones (2nd Gen)", store: "Amazon",
    cat: "headphones", sale: 199, was: 359, verdict: "new-low",
    evidence: "Lowest price ever seen, down 45 percent.",
    source: "thesunreport.com", note: "Mid-range noise cancellers, very comfortable.",
  },
  {
    id: "sony-xm6", name: "Sony WH-1000XM6 Wireless Headset", store: "Amazon",
    cat: "headphones", sale: 348, was: 460, verdict: "strong",
    evidence: "$112 off the usual price for the current flagship.",
    source: "techspot.com", note: "Current Sony flagship headphones.",
  },
  {
    id: "airpods-max-2", name: "Apple AirPods Max 2", store: "Amazon",
    cat: "headphones", sale: 419, was: 549, verdict: "strong",
    evidence: "$130 off the list price at Amazon.",
    source: "techspot.com", note: "Over-ear AirPods with strong noise cancelling.",
  },
  {
    id: "sony-wf-xm5", name: "Sony WF-1000XM5 True Wireless Earbuds", store: "Amazon",
    cat: "headphones", sale: 179, was: 299, verdict: "strong",
    evidence: "$120 off the usual price.",
    source: "techspot.com", note: "Sony's top earbuds, compact case.",
  },
  {
    id: "powerbeats-pro2", name: "Beats Powerbeats Pro 2 Wireless Earbuds", store: "Amazon",
    cat: "headphones", sale: 179, was: 250, verdict: "strong",
    evidence: "$71 off the normal price.",
    source: "techspot.com", note: "Ear-hook design, built for workouts.",
  },
  {
    id: "sennheiser-m4", name: "Sennheiser Momentum 4 Noise Cancelling Headphones", store: "Amazon",
    cat: "headphones", sale: 189, was: 299, verdict: "strong",
    evidence: "$110 off the usual price.",
    source: "techspot.com", note: "60-hour battery life, warm sound.",
  },
  {
    id: "sonos-ace", name: "Sonos Ace Noise Cancelling Headphones", store: "Amazon",
    cat: "headphones", sale: 229, was: 349, verdict: "strong",
    evidence: "$120 off the usual price.",
    source: "techspot.com", note: "Sonos sound, pairs with Sonos soundbars.",
  },
  {
    id: "bose-soundlink-max", name: "Bose SoundLink Max Bluetooth Speaker", store: "Amazon",
    cat: "headphones", sale: 279, was: 399, verdict: "strong",
    evidence: "$120 off the list price.",
    source: "techspot.com", note: "Big portable speaker, room-filling sound.",
  },
];

export const DEALS_HOME = [
  {
    id: "fire-tv-4k", name: "Amazon Fire TV Stick 4K (2026)", store: "Amazon",
    cat: "smarthome", sale: 19.99, was: 59.99, verdict: "strong",
    evidence: "Two-thirds off the list price in the early sale.",
    source: "petematheson.com", note: "4K streaming stick with Alexa remote.",
  },
  {
    id: "ring-doorbell-2k", name: "Ring Battery Doorbell 2K", store: "Amazon",
    cat: "smarthome", sale: 39.99, was: 99.99, verdict: "strong",
    evidence: "$60 off the list price.",
    source: "top10-best.com", note: "Battery doorbell with 2K video.",
  },
  {
    id: "blink-mini", name: "Amazon Blink Mini 2K+ Security Camera", store: "Amazon",
    cat: "smarthome", sale: 15, was: 39, verdict: "strong",
    evidence: "Listed at $15 against a $39 list price.",
    source: "multikhabar.com", note: "Small indoor camera, easy to place.",
  },
  {
    id: "kasa-bulb", name: "Kasa KL110 LED Wi-Fi Smart Bulb", store: "Amazon",
    cat: "smarthome", sale: 7, was: 16, verdict: "strong",
    evidence: "Listed at $7 against a $16 list price.",
    source: "multikhabar.com", note: "Wi-Fi bulb, no hub needed.",
  },
  {
    id: "amazon-plug", name: "Amazon Smart Plug", store: "Amazon",
    cat: "smarthome", sale: 14, was: 24, verdict: "strong",
    evidence: "Listed at $14 against a $24 list price.",
    source: "multikhabar.com", note: "Turns any lamp into a smart lamp.",
  },
  {
    id: "airtag2-4pk", name: "Apple AirTag (2nd Gen) 4-pack", store: "Amazon",
    cat: "smarthome", sale: 79, was: 100, verdict: "strong",
    evidence: "$21 off the list price for four trackers.",
    source: "techspot.com", note: "Find keys, bags and luggage from your phone.",
  },
  {
    id: "eero7", name: "eero 7 Mesh Wi-Fi 7 System", store: "Amazon",
    cat: "smarthome", sale: 229, was: 300, verdict: "strong",
    evidence: "$71 off the normal price.",
    source: "techspot.com", note: "Wi-Fi 7 mesh for a whole home.",
  },
];

export const DEALS_GAMING = [
  {
    id: "switch2-bundle", name: "Nintendo Switch 2 + Mario Kart World Bundle", store: "Best Buy",
    cat: "gaming", sale: 499, was: 550, verdict: "routine",
    evidence: "A rare $50 cut; Nintendo almost never discounts its consoles.",
    source: "techspot.com", note: "Console plus Mario Kart World in the box.",
  },
  {
    id: "switch2-woot", name: "Nintendo Switch 2", store: "Woot",
    cat: "gaming", sale: 469, was: 500, verdict: "routine",
    evidence: "$30 off the list price at Woot.",
    source: "techspot.com", note: "Console only, no game included.",
  },
  {
    id: "dualsense", name: "DualSense Wireless Controller for PS5", store: "Amazon",
    cat: "gaming", sale: 54.99, was: 74.99, verdict: "strong",
    evidence: "$20 off; Sony's own sale runs Nov 16 to Dec 7.",
    source: "comicbook.com", note: "White DualSense controller for PS5.",
  },
  {
    id: "xbox-controller", name: "Xbox Wireless Controller, Carbon Black", store: "Amazon",
    cat: "gaming", sale: 44.99, was: 64.99, verdict: "strong",
    evidence: "$20 off the list price at Amazon.",
    source: "comicbook.com", note: "Works with Xbox, PC and mobile.",
  },
  {
    id: "elden-ring", name: "Elden Ring (PS5)", store: "Amazon",
    cat: "gaming", sale: 20, was: 50, verdict: "strong",
    evidence: "60 percent off, listed by two roundups at this price.",
    source: "ultragamerz.com", note: "Open-world action RPG, game of the year winner.",
  },
  {
    id: "monster-hunter", name: "Monster Hunter Wilds (PS5)", store: "Amazon",
    cat: "gaming", sale: 24, was: 70, verdict: "strong",
    evidence: "66 percent off, the deepest game discount in the roundup.",
    source: "ultragamerz.com", note: "Co-op monster hunting, 2025 release.",
  },
  {
    id: "ghost-yotei", name: "Ghost of Yotei (PS5)", store: "PlayStation Direct",
    cat: "gaming", sale: 34.99, was: 69.99, verdict: "strong",
    evidence: "Half off at PlayStation Direct.",
    source: "ultragamerz.com", note: "Open-world samurai adventure.",
  },
  {
    id: "donkey-kong", name: "Donkey Kong Bananza (Switch 2)", store: "Amazon",
    cat: "gaming", sale: 49.99, was: 69.99, verdict: "strong",
    evidence: "$20 off at Amazon and other Nintendo retailers.",
    source: "ultragamerz.com", note: "3D platformer, Switch 2 launch title.",
  },
];

export const DEALS_KITCHEN = [
  {
    id: "dyson-v9", name: "Dyson V9 Motorbar Cordless Stick Vacuum", store: "Amazon",
    cat: "kitchen", sale: 269.99, was: 599.99, verdict: "new-low",
    evidence: "Matches the lowest price ever, only the second time this year.",
    source: "cnn.com", note: "Amazon-exclusive Dyson model, 55 percent off.",
  },
  {
    id: "dyson-v8", name: "Dyson V8 Cyclone Cordless Vacuum with Car-Cleaning Kit", store: "Walmart",
    cat: "kitchen", sale: 300, was: 450, verdict: "strong",
    evidence: "$150 less than usual; matches its lowest price to date.",
    source: "cnn.com", note: "60-minute run time, converts to a handheld.",
  },
  {
    id: "ninja-airfryer", name: "Ninja Air Fryer Pro 4-in-1", store: "Amazon",
    cat: "kitchen", sale: 79, was: 129, verdict: "strong",
    evidence: "$50 off the list price.",
    source: "top10-best.com", note: "Air fry, roast, reheat and dehydrate.",
  },
  {
    id: "kitchenaid-artisan", name: "KitchenAid Artisan 5-Qt Tilt-Head Stand Mixer, Almond Cream", store: "Amazon",
    cat: "kitchen", sale: 349, was: 499.99, verdict: "strong",
    evidence: "$150 off the list price.",
    source: "popsci.com", note: "5-quart bowl, ten speeds, classic design.",
  },
  {
    id: "breville-barista", name: "Breville Barista Express Espresso Machine", store: "Amazon",
    cat: "kitchen", sale: 494.95, was: 699.95, verdict: "strong",
    evidence: "$205 off the list price.",
    source: "popsci.com", note: "Built-in grinder, makes cafe espresso at home.",
  },
  {
    id: "shark-hydrovac", name: "Shark HydroVac MessMaster 3-in-1 Cordless Vacuum and Mop", store: "Walmart",
    cat: "kitchen", sale: 129, was: 299, verdict: "strong",
    evidence: "$170 off the list price at Walmart.",
    source: "topsave.org", note: "Vacuums and mops hard floors in one pass.",
  },
];

export const DEALS_TOYS = [
  {
    id: "lego-trex", name: "LEGO Creator 3-in-1 T. rex", store: "Amazon",
    cat: "toys", sale: 41.99, was: 59.99, verdict: "strong",
    evidence: "$18 off the list price; builds three different dinosaurs.",
    source: "popsci.com", note: "3-in-1 set, ages 9 and up.",
  },
  {
    id: "lego-n1", name: "LEGO Star Wars The Mandalorian's N-1 Starfighter", store: "Amazon",
    cat: "toys", sale: 41.99, was: 59.99, verdict: "strong",
    evidence: "$18 off the list price.",
    source: "popsci.com", note: "Star Wars set with Mando and Grogu figures.",
  },
  {
    id: "lego-redfox", name: "LEGO Creator 3-in-1 Forest Animals: Red Fox", store: "Amazon",
    cat: "toys", sale: 34.99, was: 49.99, verdict: "strong",
    evidence: "$15 off the list price.",
    source: "popsci.com", note: "Builds a fox, an owl or a squirrel.",
  },
  {
    id: "toniebox2", name: "Toniebox 2 Bluey Starter Set", store: "Walmart",
    cat: "toys", sale: 99.97, was: 149.99, verdict: "strong",
    evidence: "$50 off the list price at Walmart.",
    source: "topsave.org", note: "Screen-free audio player for kids.",
  },
];

export const DEALS_WEARABLES = [
  {
    id: "apple-watch-se3", name: "Apple Watch SE 3 (40mm)", store: "Amazon",
    cat: "wearables", sale: 179, was: 249, verdict: "strong", group: "apple-watch-se3",
    evidence: "$70 off; one of the most-voted deals of the week.",
    source: "daily.slickdeals.net", note: "Entry Apple Watch with always-on display.",
  },
  {
    id: "apple-watch-s12", name: "Apple Watch Series 12", store: "Amazon",
    cat: "wearables", sale: 299, was: 399, verdict: "strong",
    evidence: "$100 off; only the third sale since launch in September.",
    source: "cnn.com", note: "Flagship watch with new health sensors.",
  },
  {
    id: "ipad-a16", name: "Apple iPad 11-inch (A16), 128GB Wi-Fi", store: "Amazon",
    cat: "wearables", sale: 379, was: 450, verdict: "routine",
    evidence: "$71 off the list price.",
    source: "techspot.com", note: "Entry iPad, good for reading and video.",
  },
  {
    id: "kindle-paperwhite", name: "Kindle Paperwhite (2024)", store: "Amazon",
    cat: "wearables", sale: 129.99, was: 199.99, verdict: "strong",
    evidence: "$70 off the list price.",
    source: "thesunreport.com", note: "Glare-free e-reader, weeks of battery.",
  },
  {
    id: "garmin-instinct3", name: "Garmin Instinct 3 Solar Smartwatch", store: "Amazon",
    cat: "wearables", sale: 249, was: 400, verdict: "strong",
    evidence: "$151 off the list price.",
    source: "techspot.com", note: "Rugged solar watch for hiking and training.",
  },
  {
    id: "apple-watch-se3-target", name: "Apple Watch SE 3 (40mm)", store: "Target",
    cat: "wearables", sale: 199.99, was: 249.99, verdict: "routine", group: "apple-watch-se3",
    evidence: "$50 off the regular price at Target.",
    source: "flashdealfeed.com", note: "Same watch as the Amazon listing; Amazon is $20 cheaper.",
  },
];

export const ALL_DEALS = [
  ...DEALS, ...DEALS_LAPTOPS, ...DEALS_AUDIO, ...DEALS_HOME,
  ...DEALS_GAMING, ...DEALS_KITCHEN, ...DEALS_TOYS, ...DEALS_WEARABLES,
];

export function dealById(id) {
  return ALL_DEALS.find((d) => d.id === id) || null;
}

export function dealsInCategory(catId) {
  return ALL_DEALS.filter((d) => d.cat === catId);
}

export function dealsAtStore(storeName) {
  return ALL_DEALS.filter((d) => d.store === storeName);
}
