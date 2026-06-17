/**
 * Courses Data — Static course data for Supabase swap.
 */
const CourseCategories = [
  { id: 'technical', name_de: 'Technische Kurse', name_en: 'Technical Courses' },
  { id: 'engineering', name_de: 'Ingenieurkurse', name_en: 'Engineering Courses' },
  { id: 'epoxy-science', name_de: 'Epoxid-Wissenschaft', name_en: 'Epoxy Science' },
  { id: 'microcement-science', name_de: 'Mikrozement-Wissenschaft', name_en: 'Microcement Science' },
  { id: 'insulation', name_de: 'Isoliersysteme', name_en: 'Insulation Systems' },
  { id: 'concrete', name_de: 'Betonbehandlung', name_en: 'Concrete Treatment' },
  { id: 'industrial', name_de: 'Industrielle Anwendungen', name_en: 'Industrial Applications' },
];

const Courses = [
  {
    id: 'epoxy-fundamentals', slug: 'epoxy-fundamentals', category_id: 'epoxy-science',
    name_de: 'Grundlagen der Epoxidharztechnologie', name_en: 'Fundamentals of Epoxy Resin Technology',
    description_de: 'Umfassender Kurs über Chemie und Anwendung von Epoxidharzsystemen.',
    description_en: 'Comprehensive course on chemistry and application of epoxy resin systems.',
    instructor: 'Dr. Michael Weber', duration: '12h', level: 'beginner',
    is_free: true, course_price: 0, status: 'active',
    modules: [
      { title_de: 'Einführung', title_en: 'Introduction', lessons: 4 },
      { title_de: 'Chemische Grundlagen', title_en: 'Chemical Foundations', lessons: 6 },
      { title_de: 'Anwendungstechniken', title_en: 'Application Techniques', lessons: 5 },
    ],
    outcomes_en: ['Understanding epoxy chemistry', 'Correct mixing ratios', 'Flawless application'],
    outcomes_de: ['Verständnis der Epoxidchemie', 'Korrekte Mischverhältnisse', 'Fehlerfreie Anwendung'],
  },
  {
    id: 'microcement-masterclass', slug: 'microcement-masterclass', category_id: 'microcement-science',
    name_de: 'Mikrozement Masterclass', name_en: 'Microcement Masterclass',
    description_de: 'Professionelle Mikrozement-Anwendung von A bis Z.',
    description_en: 'Professional microcement application from A to Z.',
    instructor: 'Ing. Thomas Müller', duration: '16h', level: 'intermediate',
    is_free: true, course_price: 0, status: 'active',
    modules: [
      { title_de: 'Materialwissenschaft', title_en: 'Material Science', lessons: 5 },
      { title_de: 'Untergrundvorbereitung', title_en: 'Surface Preparation', lessons: 4 },
      { title_de: 'Applikationstechniken', title_en: 'Application Techniques', lessons: 6 },
    ],
    outcomes_en: ['Professional application', 'Substrate analysis', 'Sealing techniques'],
    outcomes_de: ['Professionelle Anwendung', 'Untergrundanalyse', 'Versiegelungstechniken'],
  },
  {
    id: 'insulation-engineering', slug: 'insulation-engineering', category_id: 'insulation',
    name_de: 'Isoliertechnik für Ingenieure', name_en: 'Insulation Engineering',
    description_de: 'Technischer Kurs für Ingenieure und Planer.',
    description_en: 'Technical course for engineers and planners.',
    instructor: 'Prof. Dr. Klaus Schmidt', duration: '20h', level: 'advanced',
    is_free: true, course_price: 0, status: 'active',
    modules: [
      { title_de: 'Wärmeübertragung', title_en: 'Heat Transfer', lessons: 6 },
      { title_de: 'Materialauswahl', title_en: 'Material Selection', lessons: 5 },
      { title_de: 'Systemdesign', title_en: 'System Design', lessons: 7 },
    ],
    outcomes_en: ['Calculation competency', 'Material knowledge', 'System planning'],
    outcomes_de: ['Berechnungskompetenz', 'Materialkenntnis', 'Systemplanung'],
  },
  {
    id: 'concrete-protection-course', slug: 'concrete-protection-course', category_id: 'concrete',
    name_de: 'Betonschutz und -sanierung', name_en: 'Concrete Protection and Repair',
    description_de: 'Praktischer Kurs über Betonschutzverfahren.',
    description_en: 'Practical course on concrete protection methods.',
    instructor: 'Dipl.-Ing. Anna Fischer', duration: '14h', level: 'intermediate',
    is_free: true, course_price: 0, status: 'active',
    modules: [
      { title_de: 'Betonschäden erkennen', title_en: 'Identifying Damage', lessons: 4 },
      { title_de: 'Sanierungsverfahren', title_en: 'Repair Methods', lessons: 6 },
      { title_de: 'Schutzsysteme', title_en: 'Protection Systems', lessons: 5 },
    ],
    outcomes_en: ['Damage analysis', 'Repair planning', 'Protection system selection'],
    outcomes_de: ['Schadensanalyse', 'Sanierungsplanung', 'Schutzsystemauswahl'],
  },
];

export { CourseCategories, Courses };
