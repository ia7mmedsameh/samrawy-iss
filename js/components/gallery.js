/**
 * Gallery Component
 * Handles product image gallery with thumbnail switching.
 */
class GalleryComponent {
  init() {
    document.querySelectorAll('.product-gallery').forEach(gallery => {
      const mainImage = gallery.querySelector('.product-gallery__main img');
      const thumbs = gallery.querySelectorAll('.product-gallery__thumb');

      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const src = thumb.dataset.src || thumb.querySelector('img')?.src;
          if (src && mainImage) {
            mainImage.src = src;
            mainImage.alt = thumb.dataset.alt || '';
            thumbs.forEach(t => t.classList.remove('is-active'));
            thumb.classList.add('is-active');
          }
        });
      });
    });
  }
}

export default GalleryComponent;
