/**
 * Scroll Animations
 * Uses IntersectionObserver to trigger reveal animations.
 */
import AppConfig from '../core/config.js';

class ScrollAnimator {
  constructor() {
    this._observer = null;
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
        .forEach(el => el.classList.add('is-visible'));
      return;
    }

    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this._observer.unobserve(entry.target);
          }
        });
      },
      { threshold: AppConfig.ANIMATION.INTERSECTION_THRESHOLD, rootMargin: '0px 0px -40px 0px' }
    );

    this._observeElements();
  }

  _observeElements() {
    const selectors = '.fade-in, .fade-in-left, .fade-in-right, .scale-in';
    document.querySelectorAll(selectors).forEach(el => {
      this._observer.observe(el);
    });
  }

  /** Re-observe (call after dynamic content is added) */
  refresh() {
    this._observeElements();
  }

  destroy() {
    this._observer?.disconnect();
  }
}

export default ScrollAnimator;
