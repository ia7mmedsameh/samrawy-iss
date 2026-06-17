/**
 * Footer Component
 * Handles footer initialization (newsletter, year).
 */
class FooterComponent {
  constructor() {
    this.footer = document.getElementById('site-footer');
  }

  init() {
    if (!this.footer) return;
    this._setYear();
  }

  _setYear() {
    const yearEl = this.footer.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
}

export default FooterComponent;
