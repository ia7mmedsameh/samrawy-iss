/**
 * Application Configuration
 * Central configuration for the entire application.
 * Environment-specific values should be loaded from env vars in production.
 */
const AppConfig = Object.freeze({
  // Application
  APP_NAME: 'ISS Industrial Solutions',
  APP_VERSION: '1.0.0',
  DEFAULT_LANG: 'de',
  SUPPORTED_LANGS: ['de', 'en'],

  // API / Supabase (populated via environment in production)
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',

  // Paths
  PATHS: {
    LANGUAGES: '/languages',
    IMAGES: '/assets/images',
    ICONS: '/assets/icons',
    PDFS: '/assets/pdfs',
    PAGES: '/pages',
  },

  // Pagination
  PAGINATION: {
    PRODUCTS_PER_PAGE: 12,
    ARTICLES_PER_PAGE: 9,
    COURSES_PER_PAGE: 9,
  },

  // Analytics placeholders (populated in production)
  ANALYTICS: {
    GA_MEASUREMENT_ID: '',
    GTM_ID: '',
    META_PIXEL_ID: '',
  },

  // Contact (placeholder)
  CONTACT: {
    EMAIL: 'info@iss-solutions.eu',
    PHONE: '+49 30 1234 5678',
    PHONE_SECONDARY: '+49 30 1234 5679',
    ADDRESS: 'Industriestraße 42, 10115 Berlin, Deutschland',
    WORKING_HOURS: 'Mo–Fr: 08:00 – 17:00',
  },

  // Social
  SOCIAL: {
    LINKEDIN: 'https://linkedin.com/company/iss-solutions',
    YOUTUBE: 'https://youtube.com/@iss-solutions',
    INSTAGRAM: 'https://instagram.com/iss.solutions',
  },

  // Animation
  ANIMATION: {
    INTERSECTION_THRESHOLD: 0.15,
    COUNTER_DURATION: 2000,
    TYPING_SPEED: 80,
  },
});

export default AppConfig;
