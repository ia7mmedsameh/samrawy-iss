/**
 * Become Our Agent Page Controller
 */
import Validation from '../services/validation.js';
import Toast from '../components/toast.js';
import App from '../core/app.js';

class AgentPage {
  constructor() {
    this.form = document.getElementById('agent-form');
  }

  init() {
    const app = new App();
    app.init().then(() => {
      this.bindEvents();
    });
  }

  bindEvents() {
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    if (!this.form) return;

    // Clear previous error styles
    Validation.clearErrors(this.form);

    // Form rules
    const rules = {
      name: [
        { type: 'required', message: 'Name ist erforderlich / Name is required' },
        { type: 'minLength', value: 3, message: 'Mindestens 3 Zeichen / Min 3 characters' }
      ],
      email: [
        { type: 'required', message: 'E-Mail ist erforderlich / Email is required' },
        { type: 'email', message: 'Ungültige E-Mail-Adresse / Invalid email address' }
      ],
      phone: [
        { type: 'required', message: 'Telefonnummer ist erforderlich / Phone is required' },
        { type: 'phone', message: 'Ungültige Telefonnummer / Invalid phone number' }
      ],
      company: [
        { type: 'required', message: 'Firma ist erforderlich / Company is required' }
      ],
      country: [
        { type: 'required', message: 'Land ist erforderlich / Country is required' }
      ]
    };

    const { isValid, errors } = Validation.validateForm(this.form, rules);

    if (!isValid) {
      Toast.show({
        type: 'error',
        title: 'Fehler / Error',
        message: 'Bitte füllen Sie alle erforderlichen Felder korrekt aus. / Please fill all required fields correctly.'
      });
      return;
    }

    // Capture values & sanitize
    const formData = {
      name: Validation.sanitize(this.form.elements['name'].value),
      email: Validation.sanitize(this.form.elements['email'].value),
      phone: Validation.sanitize(this.form.elements['phone'].value),
      company: Validation.sanitize(this.form.elements['company'].value),
      country: Validation.sanitize(this.form.elements['country'].value),
      experience: Validation.sanitize(this.form.elements['experience'].value),
      message: Validation.sanitize(this.form.elements['message'].value)
    };

    // Simulate API storage / lead generation
    console.log('[Agent Lead Saved]', formData);

    Toast.show({
      type: 'success',
      title: 'Bewerbung gesendet / Application Sent',
      message: 'Vielen Dank für Ihre Bewerbung. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen. / Thank you. Our team will contact you shortly.'
    });

    this.form.reset();
  }
}

const page = new AgentPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
