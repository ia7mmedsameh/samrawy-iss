/**
 * Contact Page Controller
 */
import Validation from '../services/validation.js';
import Toast from '../components/toast.js';
import App from '../core/app.js';

class ContactPage {
  constructor() {
    this.form = document.getElementById('contact-form');
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

  handleSubmit() {
    if (!this.form) return;

    Validation.clearErrors(this.form);

    const rules = {
      name: [
        { type: 'required', message: 'Name ist erforderlich / Name is required' }
      ],
      email: [
        { type: 'required', message: 'E-Mail ist erforderlich / Email is required' },
        { type: 'email', message: 'Ungültige E-Mail-Adresse / Invalid email address' }
      ],
      subject: [
        { type: 'required', message: 'Betreff ist erforderlich / Subject is required' }
      ],
      message: [
        { type: 'required', message: 'Nachricht ist erforderlich / Message is required' },
        { type: 'minLength', value: 10, message: 'Nachricht muss mindestens 10 Zeichen lang sein / Message must be min 10 chars' }
      ]
    };

    const { isValid, errors } = Validation.validateForm(this.form, rules);

    if (!isValid) {
      Toast.show({
        type: 'error',
        title: 'Fehler / Error',
        message: 'Bitte korrigieren Sie die Fehler im Formular. / Please correct the errors in the form.'
      });
      return;
    }

    const data = {
      name: Validation.sanitize(this.form.elements['name'].value),
      email: Validation.sanitize(this.form.elements['email'].value),
      phone: Validation.sanitize(this.form.elements['phone'].value),
      subject: Validation.sanitize(this.form.elements['subject'].value),
      message: Validation.sanitize(this.form.elements['message'].value)
    };

    console.log('[Contact Form Message Saved]', data);

    Toast.show({
      type: 'success',
      title: 'Nachricht gesendet / Message Sent',
      message: 'Vielen Dank für Ihre Nachricht. Wir antworten Ihnen so schnell wie möglich. / Thank you. We will reply as soon as possible.'
    });

    this.form.reset();
  }
}

const page = new ContactPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
