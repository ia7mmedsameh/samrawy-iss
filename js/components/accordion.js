/**
 * Accordion Component
 * Handles expand/collapse with smooth animation.
 */
class AccordionComponent {
  init() {
    document.querySelectorAll('.accordion').forEach(accordion => {
      const items = accordion.querySelectorAll('.accordion__item');

      items.forEach(item => {
        const trigger = item.querySelector('.accordion__trigger');
        const content = item.querySelector('.accordion__content');

        trigger?.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');

          // Close all siblings (single-open mode)
          if (accordion.dataset.accordionMode !== 'multi') {
            items.forEach(sibling => {
              if (sibling !== item) {
                sibling.classList.remove('is-open');
                const sibContent = sibling.querySelector('.accordion__content');
                if (sibContent) sibContent.style.maxHeight = '0';
              }
            });
          }

          // Toggle current
          item.classList.toggle('is-open', !isOpen);
          if (content) {
            content.style.maxHeight = isOpen ? '0' : `${content.scrollHeight}px`;
          }
        });
      });
    });
  }
}

export default AccordionComponent;
