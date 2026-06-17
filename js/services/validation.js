/**
 * Validation Service
 * Form validation utilities with XSS protection.
 */
const Validation = {
  /**
   * Sanitize a string to prevent XSS
   * @param {string} str
   * @returns {string}
   */
  sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Validate email
   * @param {string} email
   * @returns {boolean}
   */
  isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Validate phone number (international)
   * @param {string} phone
   * @returns {boolean}
   */
  isPhone(phone) {
    return /^\+?[\d\s\-()]{7,20}$/.test(phone);
  },

  /**
   * Check required field
   * @param {string} value
   * @returns {boolean}
   */
  isRequired(value) {
    return value !== null && value !== undefined && String(value).trim().length > 0;
  },

  /**
   * Check min length
   * @param {string} value
   * @param {number} min
   * @returns {boolean}
   */
  minLength(value, min) {
    return String(value).trim().length >= min;
  },

  /**
   * Check max length
   * @param {string} value
   * @param {number} max
   * @returns {boolean}
   */
  maxLength(value, max) {
    return String(value).trim().length <= max;
  },

  /**
   * Validate a form element and return errors
   * @param {HTMLFormElement} form
   * @param {Object} rules - { fieldName: [{ type, message, value? }] }
   * @returns {{ isValid: boolean, errors: Object }}
   */
  validateForm(form, rules) {
    const errors = {};
    let isValid = true;

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const input = form.elements[fieldName];
      if (!input) continue;
      const value = input.value;

      for (const rule of fieldRules) {
        let valid = true;

        switch (rule.type) {
          case 'required':
            valid = this.isRequired(value);
            break;
          case 'email':
            valid = this.isEmail(value);
            break;
          case 'phone':
            valid = this.isPhone(value);
            break;
          case 'minLength':
            valid = this.minLength(value, rule.value);
            break;
          case 'maxLength':
            valid = this.maxLength(value, rule.value);
            break;
        }

        if (!valid) {
          errors[fieldName] = rule.message;
          isValid = false;
          break; // Stop at first error per field
        }
      }

      // Toggle error UI
      const group = input.closest('.form-group');
      if (group) {
        group.classList.toggle('has-error', !!errors[fieldName]);
        const errorEl = group.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = errors[fieldName] || '';
        }
      }
    }

    return { isValid, errors };
  },

  /**
   * Clear all form errors
   * @param {HTMLFormElement} form
   */
  clearErrors(form) {
    form.querySelectorAll('.form-group.has-error').forEach(group => {
      group.classList.remove('has-error');
      const errorEl = group.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    });
  }
};

export default Validation;
