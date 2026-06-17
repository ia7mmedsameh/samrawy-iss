/**
 * Modal Component
 * Reusable modal/dialog handler.
 */
class ModalComponent {
  constructor() {
    this._activeModal = null;
  }

  init() {
    // Open triggers
    document.querySelectorAll('[data-modal-open]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modalOpen;
        this.open(modalId);
      });
    });

    // Close triggers
    document.querySelectorAll('[data-modal-close]').forEach(trigger => {
      trigger.addEventListener('click', () => this.close());
    });

    // Backdrop close
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', () => this.close());
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._activeModal) {
        this.close();
      }
    });
  }

  open(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById(`${modalId}-backdrop`) ||
                     document.querySelector('.modal-backdrop');

    if (!modal) return;

    backdrop?.classList.add('is-active');
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    this._activeModal = modal;

    // Focus trap
    const firstFocusable = modal.querySelector('button, input, textarea, select, a[href]');
    firstFocusable?.focus();
  }

  close() {
    if (!this._activeModal) return;

    const backdrop = document.querySelector('.modal-backdrop.is-active');
    backdrop?.classList.remove('is-active');
    this._activeModal.classList.remove('is-active');
    document.body.style.overflow = '';
    this._activeModal = null;
  }
}

export default ModalComponent;
