/**
 * Toast Notification System
 */
class ToastComponent {
  constructor() {
    this._container = null;
    this._defaultDuration = 5000;
  }

  init() {
    this._container = document.getElementById('toast-container');
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.id = 'toast-container';
      this._container.className = 'toast-container';
      this._container.setAttribute('aria-live', 'polite');
      document.body.appendChild(this._container);
    }
  }

  /**
   * Show a toast notification
   * @param {Object} options
   * @param {string} options.type - 'success' | 'error' | 'warning' | 'info'
   * @param {string} options.title
   * @param {string} options.message
   * @param {number} [options.duration]
   */
  show({ type = 'info', title = '', message = '', duration = this._defaultDuration } = {}) {
    const icons = {
      success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast__icon">${icons[type] || icons.info}</span>
      <div class="toast__content">
        ${title ? `<div class="toast__title">${this._escapeHtml(title)}</div>` : ''}
        ${message ? `<div class="toast__message">${this._escapeHtml(message)}</div>` : ''}
      </div>
      <button class="toast__close" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    this._container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('is-visible'));

    // Close button
    toast.querySelector('.toast__close').addEventListener('click', () => this._dismiss(toast));

    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => this._dismiss(toast), duration);
    }
  }

  _dismiss(toast) {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Singleton
const Toast = new ToastComponent();
export default Toast;
