/**
 * Academy Course Detail Page Controller
 */
import { CourseCategories, Courses } from '../data/courses-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';
import Validation from '../services/validation.js';
import Toast from '../components/toast.js';

class CourseDetailPage {
  constructor() {
    this.courseCategory = document.getElementById('course-category');
    this.courseTitle = document.getElementById('course-title');
    this.courseDesc = document.getElementById('course-desc');
    this.courseDuration = document.getElementById('course-duration');
    this.courseLevel = document.getElementById('course-level');
    this.courseInstructor = document.getElementById('course-instructor');
    this.courseCurriculum = document.getElementById('course-curriculum');
    this.courseOutcomes = document.getElementById('course-outcomes');
    this.enrollmentForm = document.getElementById('enrollment-form');
    this.slug = new URLSearchParams(window.location.search).get('slug');
  }

  init() {
    if (!this.slug) {
      window.location.href = './academy.html';
      return;
    }

    const app = new App();
    app.init().then(() => {
      this.renderCourseDetails();
      this.bindEvents();

      AppState.on('currentLang', () => {
        this.renderCourseDetails();
      });
    });
  }

  renderCourseDetails() {
    const course = Courses.find(c => c.slug === this.slug);
    if (!course || course.status !== 'active') {
      window.location.href = './academy.html';
      return;
    }

    const cat = CourseCategories.find(c => c.id === course.category_id);
    const categoryName = cat ? (i18n.currentLang === 'de' ? cat.name_de : cat.name_en) : '';
    const courseName = i18n.currentLang === 'de' ? course.name_de : course.name_en;
    const courseDesc = i18n.currentLang === 'de' ? course.description_de : course.description_en;

    document.title = `${courseName} | ISS SOLUTIONS`;

    if (this.courseCategory) this.courseCategory.textContent = categoryName;
    if (this.courseTitle) this.courseTitle.textContent = courseName;
    if (this.courseDesc) this.courseDesc.textContent = courseDesc;
    if (this.courseDuration) this.courseDuration.textContent = course.duration;
    if (this.courseLevel) this.courseLevel.textContent = i18n.t(`common.${course.level}`);
    if (this.courseInstructor) this.courseInstructor.textContent = course.instructor;

    // Render outcomes
    if (this.courseOutcomes) {
      this.courseOutcomes.innerHTML = '';
      const outcomes = i18n.currentLang === 'de' ? course.outcomes_de : course.outcomes_en;
      if (outcomes) {
        outcomes.forEach(out => {
          const li = document.createElement('li');
          li.className = 'outcomes-list__item';
          li.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${out}</span>
          `;
          this.courseOutcomes.appendChild(li);
        });
      }
    }

    // Render curriculum accordion
    if (this.courseCurriculum) {
      this.courseCurriculum.innerHTML = '';
      if (course.modules) {
        course.modules.forEach((mod, idx) => {
          const modTitle = i18n.currentLang === 'de' ? mod.title_de : mod.title_en;
          const item = document.createElement('div');
          item.className = 'accordion__item';
          item.innerHTML = `
            <button class="accordion__trigger">
              <span>Module ${idx + 1}: ${modTitle}</span>
              <span class="text-small text-muted" style="margin-left: auto; margin-right: 1.5rem;">${mod.lessons} ${i18n.t('common.lessons')}</span>
              <svg class="accordion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="accordion__content">
              <div class="accordion__body">
                <p>Modul-Detailbeschreibung &amp; Vorlesungsinhalte für das Thema: ${modTitle}.</p>
              </div>
            </div>
          `;
          this.courseCurriculum.appendChild(item);
        });
        
        // Reinitialize Accordion event triggers
        this.initAccordionTriggers();
      }
    }
  }

  initAccordionTriggers() {
    const items = this.courseCurriculum.querySelectorAll('.accordion__item');
    items.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger');
      const content = item.querySelector('.accordion__content');
      trigger?.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close others
        items.forEach(sib => {
          if (sib !== item) {
            sib.classList.remove('is-open');
            const sibContent = sib.querySelector('.accordion__content');
            if (sibContent) sibContent.style.maxHeight = '0';
          }
        });
        // Toggle current
        item.classList.toggle('is-open', !isOpen);
        if (content) {
          content.style.maxHeight = isOpen ? '0' : `${content.scrollHeight}px`;
        }
      });
    });
  }

  bindEvents() {
    this.enrollmentForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleEnrollment();
    });
  }

  handleEnrollment() {
    if (!this.enrollmentForm) return;

    Validation.clearErrors(this.enrollmentForm);

    const rules = {
      name: [{ type: 'required', message: 'Name ist erforderlich / Name is required' }],
      email: [
        { type: 'required', message: 'E-Mail ist erforderlich / Email is required' },
        { type: 'email', message: 'Ungültige E-Mail / Invalid email' }
      ]
    };

    const { isValid, errors } = Validation.validateForm(this.enrollmentForm, rules);

    if (!isValid) return;

    const data = {
      name: Validation.sanitize(this.enrollmentForm.elements['name'].value),
      email: Validation.sanitize(this.enrollmentForm.elements['email'].value),
      course_id: this.slug
    };

    console.log('[Course Enrollment Saved]', data);

    Toast.show({
      type: 'success',
      title: 'Erfolgreich angemeldet / Successfully Enrolled',
      message: 'Sie wurden erfolgreich für diesen Kurs registriert. / You have been registered successfully.'
    });

    this.enrollmentForm.reset();
    
    // Close modal via clicking backdrop or calling Modal system if global
    const modal = document.getElementById('enrollment-modal');
    const backdrop = document.getElementById('enrollment-modal-backdrop');
    modal?.classList.remove('is-active');
    backdrop?.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

const page = new CourseDetailPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
