/**
 * Articles Data — Static blog data for Supabase swap.
 */
const ArticleCategories = [
  { id: 'articles', name_de: 'Artikel', name_en: 'Articles' },
  { id: 'news', name_de: 'Nachrichten', name_en: 'News' },
  { id: 'insights', name_de: 'Brancheneinblicke', name_en: 'Industry Insights' },
  { id: 'technical', name_de: 'Technische Publikationen', name_en: 'Technical Publications' },
];

const Articles = [
  {
    id: 'future-of-insulation', slug: 'future-of-insulation', category_id: 'insights',
    title_de: 'Die Zukunft der Wärmedämmung', title_en: 'The Future of Thermal Insulation',
    excerpt_de: 'Neue Technologien revolutionieren die Isolierbranche.',
    excerpt_en: 'New technologies are revolutionizing the insulation industry.',
    content_de: '<p>Die Isolierbranche erlebt derzeit einen bedeutenden Wandel...</p>',
    content_en: '<p>The insulation industry is currently experiencing a significant transformation...</p>',
    author: 'Dr. Michael Weber', date: '2026-06-10', read_time: '5 min',
    tags: ['insulation', 'technology', 'innovation'],
    status: 'published', is_featured: true,
    meta_title_de: 'Zukunft der Wärmedämmung | ISS',
    meta_title_en: 'Future of Thermal Insulation | ISS',
  },
  {
    id: 'epoxy-flooring-trends', slug: 'epoxy-flooring-trends', category_id: 'articles',
    title_de: 'Epoxidbodentrends 2026', title_en: 'Epoxy Flooring Trends 2026',
    excerpt_de: 'Die neuesten Trends in der Epoxidboden-Gestaltung.',
    excerpt_en: 'The latest trends in epoxy floor design.',
    content_de: '<p>Epoxidböden haben sich weit über ihre industriellen Ursprünge hinaus entwickelt...</p>',
    content_en: '<p>Epoxy floors have evolved far beyond their industrial origins...</p>',
    author: 'Ing. Thomas Müller', date: '2026-06-05', read_time: '7 min',
    tags: ['epoxy', 'flooring', 'design'],
    status: 'published', is_featured: false,
  },
  {
    id: 'microcement-guide', slug: 'microcement-guide', category_id: 'technical',
    title_de: 'Mikrozement Anwendungsleitfaden', title_en: 'Microcement Application Guide',
    excerpt_de: 'Schritt-für-Schritt-Anleitung für perfekte Mikrozement-Oberflächen.',
    excerpt_en: 'Step-by-step guide for perfect microcement surfaces.',
    content_de: '<p>Eine professionelle Mikrozement-Anwendung erfordert Präzision...</p>',
    content_en: '<p>A professional microcement application requires precision...</p>',
    author: 'Anna Fischer', date: '2026-05-28', read_time: '10 min',
    tags: ['microcement', 'guide', 'application'],
    status: 'published', is_featured: false,
  },
  {
    id: 'iss-expansion-2026', slug: 'iss-expansion-2026', category_id: 'news',
    title_de: 'ISS expandiert nach Südeuropa', title_en: 'ISS Expands to Southern Europe',
    excerpt_de: 'ISS Industrial Solutions eröffnet neue Niederlassungen in Südeuropa.',
    excerpt_en: 'ISS Industrial Solutions opens new offices in Southern Europe.',
    content_de: '<p>Wir freuen uns, die Expansion in den südeuropäischen Markt bekannt zu geben...</p>',
    content_en: '<p>We are pleased to announce our expansion into the Southern European market...</p>',
    author: 'Redaktion', date: '2026-05-20', read_time: '3 min',
    tags: ['news', 'expansion', 'europe'],
    status: 'published', is_featured: false,
  },
];

export { ArticleCategories, Articles };
