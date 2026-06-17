/**
 * Internationalization (i18n) Module
 * Handles language loading, switching, and DOM translation.
 */
import AppState from '../core/state.js';
import AppConfig from '../core/config.js';

class I18nManager {
  constructor() {
    this._translations = {};
    this._loadedLangs = new Set();
  }

  /** Initialize i18n — load saved or default language */
  async init() {
    const savedLang = localStorage.getItem('iss_lang') || AppConfig.DEFAULT_LANG;
    const lang = AppConfig.SUPPORTED_LANGS.includes(savedLang) ? savedLang : AppConfig.DEFAULT_LANG;
    await this.setLanguage(lang);
  }

  /** Load a language file */
  async _loadLanguage(lang) {
    if (this._loadedLangs.has(lang)) return;

    try {
      const response = await fetch(`${AppConfig.PATHS.LANGUAGES}/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      this._translations[lang] = await response.json();
      this._loadedLangs.add(lang);
    } catch (error) {
      console.error(`[i18n] Error loading language "${lang}":`, error);
      // Fall back to empty object — graceful degradation
      this._translations[lang] = {};
    }
  }

  /** Set active language */
  async setLanguage(lang) {
    if (!AppConfig.SUPPORTED_LANGS.includes(lang)) {
      console.warn(`[i18n] Language "${lang}" is not supported.`);
      return;
    }

    await this._loadLanguage(lang);
    AppState.set('currentLang', lang);
    localStorage.setItem('iss_lang', lang);
    document.documentElement.lang = lang;

    this._translateDOM();
    this._updateLangSwitcher(lang);
  }

  /** Get a translation by key path (dot notation) */
  t(key, lang) {
    const activeLang = lang || AppState.get('currentLang');
    const translations = this._translations[activeLang] || {};
    return this._getNestedValue(translations, key) || key;
  }

  /** Traverse nested object by dot-notation key */
  _getNestedValue(obj, path) {
    return path.split('.').reduce((current, part) => {
      return current && current[part] !== undefined ? current[part] : null;
    }, obj);
  }

  /** Translate all DOM elements with data-i18n attribute */
  _translateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    // Handle data-i18n-placeholder
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });

    // Handle data-i18n-title
    const titles = document.querySelectorAll('[data-i18n-title]');
    titles.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.title = translation;
      }
    });

    // Handle data-i18n-aria
    const arias = document.querySelectorAll('[data-i18n-aria]');
    arias.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.setAttribute('aria-label', translation);
      }
    });
  }

  /** Update language switcher active state */
  _updateLangSwitcher(lang) {
    document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
  }

  /** Get current language */
  get currentLang() {
    return AppState.get('currentLang');
  }
}

// Singleton
const i18n = new I18nManager();
export default i18n;
