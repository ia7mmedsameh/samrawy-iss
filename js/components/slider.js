/**
 * Slider Component
 * Lightweight carousel/slider for testimonials and other content.
 */
class SliderComponent {
  init() {
    document.querySelectorAll('[data-slider]').forEach(slider => {
      this._initSlider(slider);
    });
  }

  _initSlider(container) {
    const slides = container.querySelectorAll('[data-slide]');
    const prevBtn = container.querySelector('[data-slider-prev]');
    const nextBtn = container.querySelector('[data-slider-next]');
    const dots = container.querySelector('[data-slider-dots]');
    let current = 0;
    const total = slides.length;
    let interval = null;
    const autoplayDelay = parseInt(container.dataset.sliderAutoplay, 10) || 0;

    if (total === 0) return;

    // Create dots
    if (dots) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === 0 ? 'is-active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dots.appendChild(dot);
      }
    }

    const goTo = (index) => {
      slides[current].classList.remove('is-active');
      dots?.children[current]?.classList.remove('is-active');

      current = (index + total) % total;

      slides[current].classList.add('is-active');
      dots?.children[current]?.classList.add('is-active');
    };

    // Show first slide
    slides.forEach((s, i) => s.classList.toggle('is-active', i === 0));

    prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

    // Autoplay
    const startAutoplay = () => {
      if (autoplayDelay > 0) {
        interval = setInterval(() => goTo(current + 1), autoplayDelay);
      }
    };

    const resetAutoplay = () => {
      clearInterval(interval);
      startAutoplay();
    };

    startAutoplay();
  }
}

export default SliderComponent;
