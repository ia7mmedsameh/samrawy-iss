/**
 * Tabs Component
 * Handles tab switching with data attributes.
 */
class TabsComponent {
  init() {
    document.querySelectorAll('.tabs').forEach(tabsContainer => {
      const buttons = tabsContainer.querySelectorAll('.tabs__btn');
      const panels = tabsContainer.querySelectorAll('.tabs__panel');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          buttons.forEach(b => b.classList.remove('is-active'));
          panels.forEach(p => p.classList.remove('is-active'));

          btn.classList.add('is-active');
          const panel = tabsContainer.querySelector(`[data-tab-panel="${target}"]`);
          panel?.classList.add('is-active');
        });
      });
    });
  }
}

export default TabsComponent;
