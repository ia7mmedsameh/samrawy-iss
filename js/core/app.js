/**
 * Application Bootstrap
 * Initializes all components and services.
 */
import AppState from './state.js';
import i18n from '../i18n/i18n.js';
import HeaderComponent from '../components/header.js';
import FooterComponent from '../components/footer.js';
import ScrollAnimator from '../components/scroll-animator.js';
import CounterComponent from '../components/counter.js';
import ModalComponent from '../components/modal.js';
import TabsComponent from '../components/tabs.js';
import AccordionComponent from '../components/accordion.js';
import SliderComponent from '../components/slider.js';
import GalleryComponent from '../components/gallery.js';
import Toast from '../components/toast.js';

class App {
  constructor() {
    this.header = new HeaderComponent();
    this.footer = new FooterComponent();
    this.scrollAnimator = new ScrollAnimator();
    this.counter = new CounterComponent();
    this.modal = new ModalComponent();
    this.tabs = new TabsComponent();
    this.accordion = new AccordionComponent();
    this.slider = new SliderComponent();
    this.gallery = new GalleryComponent();
  }

  async init() {
    try {
      // Initialize i18n first (loads translations)
      await i18n.init();

      // Initialize all components
      this.header.init();
      this.footer.init();
      this.scrollAnimator.init();
      this.counter.init();
      this.modal.init();
      this.tabs.init();
      this.accordion.init();
      this.slider.init();
      this.gallery.init();
      Toast.init();

      // Smooth scroll for anchor links
      this._initSmoothScroll();

      // Analytics initialization placeholder
      this._initAnalytics();

      // Hide loader
      this._hideLoader();

      AppState.set('isLoading', false);
    } catch (error) {
      console.error('[App] Initialization failed:', error);
      this._hideLoader();
    }
  }

  _initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  _hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('is-hidden');
      setTimeout(() => loader.remove(), 500);
    }
  }

  /**
   * Analytics placeholder — populate IDs in config.js
   * Supports: GA4, GTM, Meta Pixel
   */
  _initAnalytics() {
    // Google Tag Manager
    // if (AppConfig.ANALYTICS.GTM_ID) { ... }
    // Google Analytics
    // if (AppConfig.ANALYTICS.GA_MEASUREMENT_ID) { ... }
    // Meta Pixel
    // if (AppConfig.ANALYTICS.META_PIXEL_ID) { ... }
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

export default App;
