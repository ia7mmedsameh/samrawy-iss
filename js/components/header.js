/**
 * Header Component
 * Handles navigation, scroll effects, mobile menu, and dropdowns.
 */
import AppState from '../core/state.js';
import i18n from '../i18n/i18n.js';

class HeaderComponent {
  constructor() {
    this.header = document.getElementById('site-header');
    this.mobileToggle = document.getElementById('mobile-toggle');
    this.mobileNav = document.getElementById('mobile-nav');
    this.mobileOverlay = document.getElementById('mobile-overlay');
    this._lastScrollY = 0;
    this._ticking = false;
  }

  init() {
    if (!this.header) return;
    this._ensureMobileNavMarkup();
    this._bindScrollEffect();
    this._bindMobileMenu();
    this._bindDropdowns();
    this._bindLangSwitcher();
  }

  /** Dynamically inject mobile nav drawer and toggle if missing in subpages */
  _ensureMobileNavMarkup() {
    if (!this.mobileToggle) {
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'mobile-toggle';
      toggleBtn.className = 'mobile-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
      toggleBtn.innerHTML = `
        <span class="mobile-toggle__bar"></span>
        <span class="mobile-toggle__bar"></span>
        <span class="mobile-toggle__bar"></span>
      `;
      const headerMainContainer = this.header.querySelector('.header-main .container');
      if (headerMainContainer) {
        headerMainContainer.appendChild(toggleBtn);
      }
      this.mobileToggle = toggleBtn;
    }

    if (!this.mobileOverlay) {
      const overlay = document.createElement('div');
      overlay.id = 'mobile-overlay';
      overlay.className = 'mobile-nav__overlay';
      document.body.appendChild(overlay);
      this.mobileOverlay = overlay;
    }

    if (!this.mobileNav) {
      const nav = document.createElement('nav');
      nav.id = 'mobile-nav';
      nav.className = 'mobile-nav';
      nav.setAttribute('aria-label', 'Mobile Navigation');

      const isSubpage = window.location.pathname.includes('/pages/');
      const prefix = isSubpage ? './' : './pages/';
      const indexUrl = isSubpage ? '../index.html' : './index.html';

      nav.innerHTML = `
        <div class="mobile-nav__header">
          <span class="header-logo__name">ISS SOLUTIONS</span>
          <button id="mobile-close" class="mobile-nav__close" aria-label="Close Navigation">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="mobile-nav__body">
          <a href="${indexUrl}" class="mobile-nav__link" data-i18n="nav.home">Startseite</a>
          <a href="#" class="mobile-nav__link" data-submenu="company">
            <span data-i18n="nav.company">ISS</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-nav__submenu">
            <a href="${prefix}about.html" class="mobile-nav__sublink" data-i18n="nav.about">Über uns</a>
            <a href="${prefix}chairman.html" class="mobile-nav__sublink" data-i18n="nav.chairman">Botschaft des Vorsitzenden</a>
            <a href="${prefix}policies.html" class="mobile-nav__sublink" data-i18n="nav.policies">Unsere Richtlinien</a>
            <a href="${prefix}certifications.html" class="mobile-nav__sublink" data-i18n="nav.certifications">Zertifizierungen</a>
            <a href="${prefix}hr.html" class="mobile-nav__sublink" data-i18n="nav.hr">Personalwesen</a>
          </div>
          <a href="#" class="mobile-nav__link" data-submenu="products">
            <span data-i18n="nav.products">Produkte</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-nav__submenu">
            <a href="${prefix}category.html?slug=insulation-systems" class="mobile-nav__sublink" data-i18n="nav.insulation">Isoliersysteme</a>
            <a href="${prefix}category.html?slug=epoxy-systems" class="mobile-nav__sublink" data-i18n="nav.epoxy">Epoxidsysteme</a>
            <a href="${prefix}category.html?slug=microcement" class="mobile-nav__sublink" data-i18n="nav.microcement">Mikrozement</a>
            <a href="${prefix}category.html?slug=concrete-treatments" class="mobile-nav__sublink" data-i18n="nav.concrete">Betonbehandlungen</a>
          </div>
          <a href="${prefix}agent.html" class="mobile-nav__link" data-i18n="nav.agent">Agent werden</a>
          <a href="${prefix}academy.html" class="mobile-nav__link" data-i18n="nav.academy">Akademie</a>
          <a href="${prefix}blog.html" class="mobile-nav__link" data-i18n="nav.blog">Blog</a>
          <a href="${prefix}contact.html" class="mobile-nav__link" data-i18n="nav.contact">Kontakt</a>
        </div>
      `;
      document.body.appendChild(nav);
      this.mobileNav = nav;

      if (i18n && typeof i18n._translateDOM === 'function') {
        i18n._translateDOM();
      }
    }
  }

  /** Scroll-triggered header style changes */
  _bindScrollEffect() {
    window.addEventListener('scroll', () => {
      if (!this._ticking) {
        window.requestAnimationFrame(() => {
          this._onScroll();
          this._ticking = false;
        });
        this._ticking = true;
      }
    }, { passive: true });
  }

  _onScroll() {
    const scrollY = window.scrollY;
    this.header.classList.toggle('is-scrolled', scrollY > 60);
    this._lastScrollY = scrollY;
  }

  /** Mobile menu open/close */
  _bindMobileMenu() {
    if (!this.mobileToggle) return;

    this.mobileToggle.addEventListener('click', () => this._toggleMobileMenu());

    if (this.mobileOverlay) {
      this.mobileOverlay.addEventListener('click', () => this._closeMobileMenu());
    }

    // Close mobile nav links
    this.mobileNav?.querySelectorAll('.mobile-nav__link:not([data-submenu])').forEach(link => {
      link.addEventListener('click', () => this._closeMobileMenu());
    });

    // Mobile close button
    const mobileClose = document.getElementById('mobile-close');
    if (mobileClose) {
      mobileClose.addEventListener('click', () => this._closeMobileMenu());
    }

    // Mobile submenus
    this.mobileNav?.querySelectorAll('[data-submenu]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = trigger.nextElementSibling;
        if (submenu) submenu.classList.toggle('is-open');
        trigger.classList.toggle('is-open');
      });
    });
  }

  _toggleMobileMenu() {
    const isOpen = this.mobileNav?.classList.toggle('is-open');
    this.mobileToggle?.classList.toggle('is-active', isOpen);
    this.mobileOverlay?.classList.toggle('is-visible', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    AppState.set('isMenuOpen', isOpen);
  }

  _closeMobileMenu() {
    this.mobileNav?.classList.remove('is-open');
    this.mobileToggle?.classList.remove('is-active');
    this.mobileOverlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
    AppState.set('isMenuOpen', false);
  }

  /** Desktop dropdown handling */
  _bindDropdowns() {
    // Keyboard accessibility for dropdowns
    document.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('.nav-link');
      if (!link) return;

      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item.is-open').forEach(item => {
          item.classList.remove('is-open');
        });
      }
    });
  }

  /** Language switcher */
  _bindLangSwitcher() {
    document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang) i18n.setLanguage(lang);
      });
    });
  }
}

export default HeaderComponent;
