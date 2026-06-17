/**
 * Products Data
 * Static product data — will be replaced with Supabase queries.
 * Structure mirrors the planned database schema.
 */
const ProductCategories = [
  {
    id: 'insulation-systems',
    slug: 'insulation-systems',
    name_de: 'Isoliersysteme',
    name_en: 'Insulation Systems',
    description_de: 'Hochleistungsfähige Isolierlösungen für Industrie und Bau.',
    description_en: 'High-performance insulation solutions for industrial and construction applications.',
    icon: 'shield',
    order: 1,
  },
  {
    id: 'epoxy-systems',
    slug: 'epoxy-systems',
    name_de: 'Epoxidsysteme',
    name_en: 'Epoxy Systems',
    description_de: 'Professionelle Epoxidharz-Systeme für Böden, Beschichtungen und Kunst.',
    description_en: 'Professional epoxy resin systems for flooring, coatings, and decorative applications.',
    icon: 'layers',
    order: 2,
  },
  {
    id: 'microcement',
    slug: 'microcement',
    name_de: 'Mikrozement',
    name_en: 'Microcement',
    description_de: 'Premium Mikrozement-Systeme für nahtlose, moderne Oberflächen.',
    description_en: 'Premium microcement systems for seamless, modern surfaces.',
    icon: 'droplet',
    order: 3,
  },
  {
    id: 'concrete-treatments',
    slug: 'concrete-treatments',
    name_de: 'Betonbehandlungen',
    name_en: 'Concrete Treatments',
    description_de: 'Umfassende Betonbehandlungs- und Schutzsysteme.',
    description_en: 'Comprehensive concrete treatment and protection systems.',
    icon: 'cube',
    order: 4,
  },
];

const Products = [
  // === Insulation Systems ===
  { 
    id: 'acrylic', 
    slug: 'acrylic', 
    category_id: 'insulation-systems', 
    name_de: 'Acryl', 
    name_en: 'Acrylic', 
    status: 'active', 
    is_featured: true, 
    order: 1,
    description_de: 'Hochleistungs-Acrylisolierung für vielseitige industrielle Anwendungen.',
    description_en: 'High-performance acrylic insulation for versatile industrial applications.',
    features_de: ['Hohe Temperaturbeständigkeit', 'UV-Beständigkeit', 'Schnelle Aushärtung', 'Umweltfreundlich'],
    features_en: ['High temperature resistance', 'UV resistance', 'Quick curing', 'Eco-friendly'],
    specs: { color: 'Weiß / White', coverage: '1.5–2.0 m²/kg', drying_time: '2–4 h', temperature_range: '-20°C bis +120°C' },
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Sicherheitsdatenblatt Acryl', name_en: 'Safety Datasheet Acrylic', size: '1.2 MB', url: '#' },
      { name_de: 'Technisches Merkblatt Acryl', name_en: 'Technical Datasheet Acrylic', size: '840 KB', url: '#' }
    ],
    related_products: ['advanced-acrylic', 'nano-ceramic'],
    meta_title: 'Premium Acrylic Industrial Insulation | ISS Solutions',
    meta_description: 'High-performance acrylic insulation for versatile industrial applications. Heat and UV resistant.',
    seo_slug: 'acrylic-industrial-insulation',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=acrylic'
  },
  { 
    id: 'advanced-acrylic', 
    slug: 'advanced-acrylic', 
    category_id: 'insulation-systems', 
    name_de: 'Advanced Acryl', 
    name_en: 'Advanced Acrylic', 
    status: 'active', 
    is_featured: false, 
    order: 2,
    description_de: 'Fortschrittliches Acrylsystem mit verbesserter Leistung und Haltbarkeit.',
    description_en: 'Advanced acrylic system with enhanced performance and durability.',
    features_de: ['Verstärkte Formel', 'Extreme Haltbarkeit', 'Breitere Anwendung', 'Premium-Qualität'],
    features_en: ['Reinforced formula', 'Extreme durability', 'Wider application range', 'Premium quality'],
    specs: { color: 'Weiß / White', coverage: '1.2–1.8 m²/kg', drying_time: '3–5 h', temperature_range: '-30°C bis +150°C' },
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Technisches Merkblatt Advanced', name_en: 'Technical Datasheet Advanced', size: '920 KB', url: '#' }
    ],
    related_products: ['acrylic', 'astromic'],
    meta_title: 'Advanced Acrylic System | ISS Solutions',
    meta_description: 'Reinforced formula and extreme durability for professional applications.',
    seo_slug: 'advanced-acrylic-insulation',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=advanced-acrylic'
  },
  { 
    id: 'astromic', 
    slug: 'astromic', 
    category_id: 'insulation-systems', 
    name_de: 'Astromic', 
    name_en: 'Astromic', 
    status: 'active', 
    is_featured: true, 
    order: 3,
    description_de: 'Astromic-Isoliertechnologie für maximalen Wärmeschutz.',
    description_en: 'Astromic insulation technology for maximum thermal protection.',
    features_de: ['Patentierte Technologie', 'Maximaler Wärmeschutz', 'Langlebig', 'Industriestandard'],
    features_en: ['Patented technology', 'Maximum thermal protection', 'Long-lasting', 'Industry standard'],
    specs: { color: 'Grau / Grey', coverage: '1.0–1.5 m²/kg', drying_time: '4–6 h', temperature_range: '-40°C bis +200°C' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Sicherheitsdatenblatt Astromic', name_en: 'Safety Datasheet Astromic', size: '1.4 MB', url: '#' }
    ],
    related_products: ['advanced-astromic', 'nano-ceramic'],
    meta_title: 'Astromic Thermal Protection | ISS Solutions',
    meta_description: 'Patented Astromic insulation technology for heavy-duty industrial thermal protection.',
    seo_slug: 'astromic-thermal-insulation',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=astromic'
  },
  { 
    id: 'advanced-astromic', 
    slug: 'advanced-astromic', 
    category_id: 'insulation-systems', 
    name_de: 'Advanced Astromic', 
    name_en: 'Advanced Astromic', 
    status: 'active', 
    is_featured: false, 
    order: 4,
    description_de: 'Erweiterte Astromic-Formel für extreme Bedingungen.',
    description_en: 'Enhanced Astromic formula for extreme conditions.',
    features_de: ['Extreme Bedingungen', 'Verbesserte Haftung', 'Chemikalienbeständig', 'Premium'],
    features_en: ['Extreme conditions', 'Improved adhesion', 'Chemical resistant', 'Premium grade'],
    specs: { color: 'Grau / Grey', coverage: '0.8–1.2 m²/kg', drying_time: '5–8 h', temperature_range: '-50°C bis +250°C' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Sicherheitsdatenblatt Advanced Astromic', name_en: 'Safety Datasheet Advanced Astromic', size: '1.5 MB', url: '#' }
    ],
    related_products: ['astromic', 'nano-ceramic'],
    meta_title: 'Advanced Astromic High Temp Insulation | ISS Solutions',
    meta_description: 'Chemical resistant and high temperature range Astromic insulation formula.',
    seo_slug: 'advanced-astromic-insulation',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=advanced-astromic'
  },
  { 
    id: 'nano-ceramic', 
    slug: 'nano-ceramic', 
    category_id: 'insulation-systems', 
    name_de: 'Nano Keramik', 
    name_en: 'Nano Ceramic', 
    status: 'active', 
    is_featured: true, 
    order: 5,
    description_de: 'Nano-Keramik-Isolierung der nächsten Generation.',
    description_en: 'Next-generation nano-ceramic insulation technology.',
    features_de: ['Nano-Technologie', 'Ultradünn', 'Höchste Effizienz', 'Zukunftssicher'],
    features_en: ['Nano technology', 'Ultra-thin application', 'Maximum efficiency', 'Future-proof'],
    specs: { color: 'Weiß / White', coverage: '2.0–3.0 m²/kg', drying_time: '1–2 h', temperature_range: '-60°C bis +300°C' },
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Technisches Merkblatt Nano', name_en: 'Technical Datasheet Nano', size: '1.1 MB', url: '#' }
    ],
    related_products: ['acrylic', 'astromic'],
    meta_title: 'Nano-Ceramic Insulation Coating | ISS Solutions',
    meta_description: 'Next-gen ultra-thin nano-ceramic thermal insulation coating for industrial systems.',
    seo_slug: 'nano-ceramic-insulation',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=nano-ceramic'
  },

  // === Epoxy Systems ===
  { 
    id: 'transparent-epoxy', 
    slug: 'transparent-epoxy', 
    category_id: 'epoxy-systems', 
    name_de: 'Transparentes Epoxid', 
    name_en: 'Transparent Epoxy', 
    status: 'active', 
    is_featured: true, 
    order: 1,
    description_de: 'Kristallklares Epoxidharz für Beschichtungen und Kunstharz-Anwendungen.',
    description_en: 'Crystal-clear epoxy resin for coatings and resin art applications.',
    features_de: ['Kristallklar', 'UV-stabil', 'Selbstnivellierend', 'Keine Blasenbildung'],
    features_en: ['Crystal clear', 'UV stable', 'Self-leveling', 'Bubble-free'],
    specs: { type: 'Two-component', mix_ratio: '2:1', pot_life: '30–45 min', cure_time: '24–48 h' },
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Technisches Datenblatt Epoxid', name_en: 'Technical Datasheet Epoxy', size: '850 KB', url: '#' }
    ],
    related_products: ['colored-epoxy', 'metallic-epoxy'],
    meta_title: 'Crystal Clear Transparent Epoxy Resin | ISS Solutions',
    meta_description: 'Professional-grade UV stable transparent epoxy coating for seamless finishes.',
    seo_slug: 'transparent-epoxy-coating',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=transparent-epoxy'
  },
  { 
    id: 'colored-epoxy', 
    slug: 'colored-epoxy', 
    category_id: 'epoxy-systems', 
    name_de: 'Farbiges Epoxid', 
    name_en: 'Colored Epoxy', 
    status: 'active', 
    is_featured: false, 
    order: 2,
    description_de: 'Farbiges Epoxidharz-System mit breiter Farbpalette.',
    description_en: 'Colored epoxy resin system with a wide color palette.',
    features_de: ['Große Farbauswahl', 'Hochglanz', 'Abriebfest', 'Farbstabil'],
    features_en: ['Wide color range', 'High gloss', 'Abrasion resistant', 'Color stable'],
    specs: { type: 'Two-component', mix_ratio: '2:1', pot_life: '25–40 min', cure_time: '24–36 h' },
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Farbpalette', name_en: 'Color Chart', size: '2.1 MB', url: '#' }
    ],
    related_products: ['transparent-epoxy', 'colored-sand-epoxy'],
    meta_title: 'Colored Epoxy Floor Resin | ISS Solutions',
    meta_description: 'Industrial and commercial colored epoxy floor coatings. Abrasion resistant and high gloss.',
    seo_slug: 'colored-epoxy-floor',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=colored-epoxy'
  },
  { 
    id: 'colored-sand-epoxy', 
    slug: 'colored-sand-epoxy', 
    category_id: 'epoxy-systems', 
    name_de: 'Farbsand-Epoxid', 
    name_en: 'Colored Sand Epoxy', 
    status: 'active', 
    is_featured: false, 
    order: 3,
    description_de: 'Dekoratives Epoxid mit natürlichen Sandtexturen.',
    description_en: 'Decorative epoxy with natural sand textures.',
    features_de: ['Natürliche Textur', 'Rutschfest', 'Dekorativ', 'Strapazierfähig'],
    features_en: ['Natural texture', 'Anti-slip', 'Decorative', 'Durable'],
    specs: { type: 'Two-component', mix_ratio: '3:1', pot_life: '20–35 min', cure_time: '24–48 h' },
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Sicherheitsdatenblatt Farbsand', name_en: 'Safety Datasheet Sand Epoxy', size: '1.3 MB', url: '#' }
    ],
    related_products: ['colored-epoxy', 'mica-epoxy'],
    meta_title: 'Anti-slip Colored Sand Epoxy Flooring | ISS Solutions',
    meta_description: 'Durable anti-slip quartz and colored sand epoxy floor systems for public and commercial spaces.',
    seo_slug: 'colored-sand-epoxy-floor',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=colored-sand-epoxy'
  },
  { 
    id: 'mica-epoxy', 
    slug: 'mica-epoxy', 
    category_id: 'epoxy-systems', 
    name_de: 'Mica-Epoxid', 
    name_en: 'Mica Epoxy', 
    status: 'active', 
    is_featured: false, 
    order: 4,
    description_de: 'Schimmerndes Mica-Epoxid für atemberaubende Oberflächen.',
    description_en: 'Shimmering mica epoxy for stunning decorative surfaces.',
    features_de: ['Schimmernder Effekt', 'Metallic-Optik', 'Einzigartige Designs', 'Premium'],
    features_en: ['Shimmer effect', 'Metallic look', 'Unique designs', 'Premium quality'],
    specs: { type: 'Two-component', mix_ratio: '2:1', pot_life: '30–45 min', cure_time: '24–48 h' },
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Mica-Datenblatt', name_en: 'Mica Datasheet', size: '750 KB', url: '#' }
    ],
    related_products: ['metallic-epoxy', '3d-epoxy'],
    meta_title: 'Decorative Mica Flake Epoxy Coating | ISS Solutions',
    meta_description: 'Unique multi-colored shimmering mica flake epoxy systems for high-end environments.',
    seo_slug: 'mica-epoxy-flakes',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=mica-epoxy'
  },
  { 
    id: '3d-epoxy', 
    slug: '3d-epoxy', 
    category_id: 'epoxy-systems', 
    name_de: '3D-Epoxid', 
    name_en: '3D Epoxy', 
    status: 'active', 
    is_featured: true, 
    order: 5,
    description_de: 'Dreidimensionales Epoxid für beeindruckende Bodengestaltung.',
    description_en: '3D epoxy system for impressive floor designs.',
    features_de: ['3D-Effekt', 'Fotorealistisch', 'Hochglanz-Finish', 'Langlebig'],
    features_en: ['3D effect', 'Photo-realistic', 'High-gloss finish', 'Long-lasting'],
    specs: { type: 'Two-component', mix_ratio: '2:1', pot_life: '35–50 min', cure_time: '48–72 h' },
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: '3D Epoxy Guide', name_en: '3D Epoxy Installation Guide', size: '1.8 MB', url: '#' }
    ],
    related_products: ['transparent-epoxy', 'metallic-epoxy'],
    meta_title: '3D Realistic Floor Epoxy Resin | ISS Solutions',
    meta_description: 'High gloss self-leveling 3D photorealistic floor coating for commercial and home designs.',
    seo_slug: '3d-epoxy-flooring',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=3d-epoxy'
  },
  { 
    id: 'metallic-epoxy', 
    slug: 'metallic-epoxy', 
    category_id: 'epoxy-systems', 
    name_de: 'Metallic-Epoxid', 
    name_en: 'Metallic Epoxy', 
    status: 'active', 
    is_featured: true, 
    order: 6,
    description_de: 'Metallic-Epoxid für luxuriöse, marmorähnliche Bodendesigns.',
    description_en: 'Metallic epoxy for luxurious, marble-like floor designs.',
    features_de: ['Metallic-Effekt', 'Luxuriöser Look', 'Marmor-Optik', 'Selbstnivellierend'],
    features_en: ['Metallic effect', 'Luxurious look', 'Marble appearance', 'Self-leveling'],
    specs: { type: 'Two-component', mix_ratio: '2:1', pot_life: '25–40 min', cure_time: '36–60 h' },
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Technisches Merkblatt Metallic', name_en: 'Technical Datasheet Metallic', size: '940 KB', url: '#' }
    ],
    related_products: ['transparent-epoxy', '3d-epoxy'],
    meta_title: 'Metallic Marble Effect Epoxy Resin | ISS Solutions',
    meta_description: 'Luxurious self-leveling metallic epoxy floor coatings creating stunning artistic designs.',
    seo_slug: 'metallic-epoxy-marble',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=metallic-epoxy'
  },

  // === Microcement ===
  { 
    id: 'microcement', 
    slug: 'microcement-product', 
    category_id: 'microcement', 
    name_de: 'Mikrozement', 
    name_en: 'Microcement', 
    status: 'active', 
    is_featured: true, 
    order: 1,
    description_de: 'Premium Mikrozement für nahtlose, moderne Oberflächen.',
    description_en: 'Premium microcement for seamless, modern surfaces.',
    features_de: ['Nahtlose Oberfläche', 'Wasserbeständig', 'Vielseitig', 'Modern'],
    features_en: ['Seamless surface', 'Water resistant', 'Versatile', 'Modern aesthetic'],
    specs: { thickness: '2–3 mm', coverage: '1.0–1.5 m²/kg', layers: '2–3', cure_time: '24–48 h' },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Systemaufbau Mikrozement', name_en: 'System Structure Microcement', size: '1.6 MB', url: '#' }
    ],
    related_products: ['primers', 'protection-systems'],
    meta_title: 'Premium Seamless Microcement Coating | ISS Solutions',
    meta_description: 'Modern and water-resistant microcement coating for floors, walls and wet rooms.',
    seo_slug: 'premium-microcement-walls-floors',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=microcement-product'
  },
  { 
    id: 'primers', 
    slug: 'primers', 
    category_id: 'microcement', 
    name_de: 'Grundierungen', 
    name_en: 'Primers', 
    status: 'active', 
    is_featured: false, 
    order: 2,
    description_de: 'Hochwertige Grundierungen für optimale Haftung.',
    description_en: 'Premium primers for optimal adhesion and surface preparation.',
    features_de: ['Optimale Haftung', 'Schnell trocknend', 'Vielseitig einsetzbar', 'Profi-Qualität'],
    features_en: ['Optimal adhesion', 'Fast drying', 'Multi-surface', 'Professional grade'],
    specs: { coverage: '5–8 m²/L', drying_time: '2–4 h', application: 'Roller / Brush', coats: '1–2' },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Datenblatt Grundierungen', name_en: 'Datasheet Primers', size: '820 KB', url: '#' }
    ],
    related_products: ['microcement-product', 'protection-systems'],
    meta_title: 'High-Bond Adhesion Primers | ISS Solutions',
    meta_description: 'Fast drying professional-grade primers to prepare concrete and walls before coating.',
    seo_slug: 'microcement-primers',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=primers'
  },
  { 
    id: 'protection-systems', 
    slug: 'protection-systems', 
    category_id: 'microcement', 
    name_de: 'Schutzsysteme', 
    name_en: 'Protection Systems', 
    status: 'active', 
    is_featured: false, 
    order: 3,
    description_de: 'Versiegelungen und Schutzsysteme für langlebige Oberflächen.',
    description_en: 'Sealers and protection systems for long-lasting surfaces.',
    features_de: ['UV-Schutz', 'Kratzfest', 'Wasserabweisend', 'Langlebig'],
    features_en: ['UV protection', 'Scratch resistant', 'Water repellent', 'Long-lasting'],
    specs: { coverage: '8–12 m²/L', drying_time: '4–8 h', application: 'Roller / Spray', coats: '2–3' },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Datenblatt Schutzsiegel', name_en: 'Datasheet Protective Sealer', size: '950 KB', url: '#' }
    ],
    related_products: ['microcement-product', 'primers'],
    meta_title: 'Scratch & UV Resistant Protective Sealers | ISS Solutions',
    meta_description: 'Advanced waterproof polyurethane protective sealers for microcement coatings.',
    seo_slug: 'microcement-sealer-protection',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=protection-systems'
  },

  // === Concrete Treatments ===
  { 
    id: 'concrete-additives', 
    slug: 'concrete-additives', 
    category_id: 'concrete-treatments', 
    name_de: 'Betonzusatzmittel', 
    name_en: 'Concrete Additives', 
    status: 'active', 
    is_featured: false, 
    order: 1,
    description_de: 'Leistungssteigernde Zusatzmittel für Beton.',
    description_en: 'Performance-enhancing additives for concrete applications.',
    features_de: ['Erhöhte Festigkeit', 'Verbesserte Verarbeitbarkeit', 'Frostschutz', 'Normgerecht'],
    features_en: ['Increased strength', 'Improved workability', 'Frost protection', 'Standard compliant'],
    specs: { dosage: '0.5–2.0%', compatibility: 'All cement types', shelf_life: '12 months' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Betonzusatzmittel Merkblatt', name_en: 'Concrete Additives Datasheet', size: '1.4 MB', url: '#' }
    ],
    related_products: ['concrete-coatings', 'liquid-polymer'],
    meta_title: 'Strength Enhancing Concrete Additives | ISS Solutions',
    meta_description: 'DIN EN compliant plasticizers and strength additives for professional concrete construction.',
    seo_slug: 'concrete-additives-strength',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=concrete-additives'
  },
  { 
    id: 'concrete-coatings', 
    slug: 'concrete-coatings', 
    category_id: 'concrete-treatments', 
    name_de: 'Betonbeschichtungen', 
    name_en: 'Concrete Coatings', 
    status: 'active', 
    is_featured: true, 
    order: 2,
    description_de: 'Schützende und dekorative Betonbeschichtungen.',
    description_en: 'Protective and decorative concrete coatings.',
    features_de: ['Schützend', 'Dekorativ', 'Chemikalienbeständig', 'Abriebfest'],
    features_en: ['Protective', 'Decorative', 'Chemical resistant', 'Abrasion resistant'],
    specs: { coverage: '4–6 m²/kg', drying_time: '4–8 h', application: 'Roller / Spray', coats: '2' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Datenblatt Betonbeschichtung', name_en: 'Concrete Coatings Datasheet', size: '1.1 MB', url: '#' }
    ],
    related_products: ['concrete-additives', 'concrete-protection'],
    meta_title: 'Chemical Resistant Concrete Coatings | ISS Solutions',
    meta_description: 'High-build wear-resistant acrylic and polyurethane protective floor and wall coatings for concrete.',
    seo_slug: 'protective-concrete-coatings',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=concrete-coatings'
  },
  { 
    id: 'primers-bonding', 
    slug: 'primers-bonding', 
    category_id: 'concrete-treatments', 
    name_de: 'Grundierungen und Haftvermittler', 
    name_en: 'Primers and Bonding Agents', 
    status: 'active', 
    is_featured: false, 
    order: 3,
    description_de: 'Grundierungen und Haftvermittler für Betonuntergründe.',
    description_en: 'Primers and bonding agents for concrete substrates.',
    features_de: ['Starke Haftung', 'Vielseitig', 'Schnell trocknend', 'Professionell'],
    features_en: ['Strong bonding', 'Versatile', 'Quick drying', 'Professional'],
    specs: { coverage: '5–10 m²/L', drying_time: '1–3 h', application: 'Roller / Brush' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Technisches Merkblatt Haftvermittler', name_en: 'Bonding Agent Datasheet', size: '920 KB', url: '#' }
    ],
    related_products: ['cementitious-treatments', 'liquid-polymer'],
    meta_title: 'High-Strength Concrete Bonding Agents | ISS Solutions',
    meta_description: 'Acrylic latex bonding agent for concrete overlays and screeds bonding.',
    seo_slug: 'concrete-bonding-primers',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=primers-bonding'
  },
  { 
    id: 'cementitious-treatments', 
    slug: 'cementitious-treatments', 
    category_id: 'concrete-treatments', 
    name_de: 'Zementöse Behandlungsmaterialien', 
    name_en: 'Cementitious Treatment Materials', 
    status: 'active', 
    is_featured: false, 
    order: 4,
    description_de: 'Zementbasierte Behandlungs- und Reparaturmaterialien.',
    description_en: 'Cement-based treatment and repair materials.',
    features_de: ['Hohe Festigkeit', 'Schnelle Aushärtung', 'Wasserbeständig', 'Dauerhaft'],
    features_en: ['High strength', 'Quick setting', 'Water resistant', 'Permanent'],
    specs: { mix_ratio: 'As specified', setting_time: '15–45 min', compressive_strength: '> 40 MPa' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Sicherheitsdatenblatt Zementmörtel', name_en: 'Cement Mortar Safety Datasheet', size: '1.2 MB', url: '#' }
    ],
    related_products: ['primers-bonding', 'concrete-protection'],
    meta_title: 'Cementitious Repair Mortar Materials | ISS Solutions',
    meta_description: 'Fast setting structural cement repair mortars with high compressive strength.',
    seo_slug: 'cement-repair-mortar',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=cementitious-treatments'
  },
  { 
    id: 'liquid-polymer', 
    slug: 'liquid-polymer', 
    category_id: 'concrete-treatments', 
    name_de: 'Flüssige Polymersysteme', 
    name_en: 'Liquid Polymer Systems', 
    status: 'active', 
    is_featured: false, 
    order: 5,
    description_de: 'Flüssige Polymeradditive und -systeme für Beton.',
    description_en: 'Liquid polymer additives and systems for concrete.',
    features_de: ['Flexibel', 'Wasserabweisend', 'Verstärkend', 'Einfache Anwendung'],
    features_en: ['Flexible', 'Water repellent', 'Reinforcing', 'Easy application'],
    specs: { dosage: '3–10%', compatibility: 'Portland cement', shelf_life: '18 months' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Polymer Modifikator Merkblatt', name_en: 'Liquid Polymer Modifier Datasheet', size: '1.6 MB', url: '#' }
    ],
    related_products: ['concrete-additives', 'primers-bonding'],
    meta_title: 'Liquid Polymer Concrete Admixtures | ISS Solutions',
    meta_description: 'Acrylic polymer latex systems to modify cement mixtures for flexibility and bonding.',
    seo_slug: 'liquid-polymer-modifier',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=liquid-polymer'
  },
  { 
    id: 'concrete-protection', 
    slug: 'concrete-protection', 
    category_id: 'concrete-treatments', 
    name_de: 'Betonschutzmaterialien', 
    name_en: 'Concrete Protection Materials', 
    status: 'active', 
    is_featured: false, 
    order: 6,
    description_de: 'Langzeitschutzsysteme für Betonkonstruktionen.',
    description_en: 'Long-term protection systems for concrete structures.',
    features_de: ['Korrosionsschutz', 'Karbonatisierungsschutz', 'Witterungsbeständig', 'Langlebig'],
    features_en: ['Corrosion protection', 'Carbonation protection', 'Weather resistant', 'Long-lasting'],
    specs: { coverage: '3–5 m²/kg', drying_time: '6–12 h', application: 'Roller / Spray / Brush', coats: '2–3' },
    images: [
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop'
    ],
    pdf_files: [
      { name_de: 'Korrosionsschutz Datenblatt', name_en: 'Corrosion Protection Datasheet', size: '1.3 MB', url: '#' }
    ],
    related_products: ['concrete-coatings', 'cementitious-treatments'],
    meta_title: 'Long-term Concrete Protection Coatings | ISS Solutions',
    meta_description: 'Anti-carbonation protective coatings for bridges and commercial reinforced concrete facades.',
    seo_slug: 'anti-carbonation-concrete-protection',
    canonical_url: 'http://localhost:3000/pages/product.html?slug=concrete-protection'
  },
];

export { ProductCategories, Products };
