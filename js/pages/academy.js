/**
 * Academy Course Listing Page Controller
 */
import { CourseCategories, Courses } from '../data/courses-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';

class AcademyPage {
  constructor() {
    this.categoryTabs = document.getElementById('course-category-tabs');
    this.coursesGrid = document.getElementById('courses-grid');
    this.activeCategory = 'all';
  }

  init() {
    const app = new App();
    app.init().then(() => {
      this.renderCategories();
      this.renderCourses();
      this.bindEvents();
    });
  }

  renderCategories() {
    if (!this.categoryTabs) return;

    CourseCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-tab';
      btn.dataset.category = cat.id;
      btn.textContent = i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
      this.categoryTabs.appendChild(btn);
    });

    AppState.on('currentLang', () => {
      this.updateTranslations();
    });
  }

  updateTranslations() {
    const tabs = this.categoryTabs.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      const catId = tab.dataset.category;
      if (catId === 'all') return;
      const cat = CourseCategories.find(c => c.id === catId);
      if (cat) {
        tab.textContent = i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
      }
    });
    this.renderCourses();
  }

  bindEvents() {
    this.categoryTabs?.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      this.categoryTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      this.activeCategory = tab.dataset.category;
      this.renderCourses();
    });
  }

  renderCourses() {
    if (!this.coursesGrid) return;
    this.coursesGrid.innerHTML = '';

    const filtered = Courses.filter(c => {
      const matchesCategory = this.activeCategory === 'all' || c.category_id === this.activeCategory;
      return matchesCategory && c.status === 'active';
    });

    if (filtered.length === 0) {
      this.coursesGrid.innerHTML = `
        <div class="w-full text-center text-muted py-12" style="grid-column: 1 / -1;">
          <p data-i18n="common.no_results">${i18n.t('common.no_results')}</p>
        </div>
      `;
      return;
    }

    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card fade-in is-visible';

      const courseName = i18n.currentLang === 'de' ? course.name_de : course.name_en;
      const courseDesc = i18n.currentLang === 'de' ? course.description_de : course.description_en;
      const categoryName = this.getCategoryName(course.category_id);
      
      const levelLabel = i18n.t(`common.${course.level}`);
      const durationLabel = i18n.t('common.duration');
      
      // Determine badge class for levels
      let levelClass = 'badge--info';
      if (course.level === 'intermediate') levelClass = 'badge--warning';
      if (course.level === 'advanced') levelClass = 'badge--danger';

      card.innerHTML = `
        <div class="course-card__image">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop" alt="${courseName}">
          <span class="course-card__free" data-i18n="academy_section.free">${i18n.t('academy_section.free')}</span>
        </div>
        <div class="course-card__body">
          <div class="flex justify-between items-center mb-3">
            <span class="course-card__category">${categoryName}</span>
            <span class="badge ${levelClass}">${levelLabel}</span>
          </div>
          <h3 class="course-card__title"><a href="./course.html?slug=${course.slug}">${courseName}</a></h3>
          <p class="course-card__desc">${courseDesc}</p>
          <div class="course-card__meta">
            <div class="course-card__meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${durationLabel}: ${course.duration}</span>
            </div>
            <div class="course-card__meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>${course.instructor}</span>
            </div>
          </div>
          <a href="./course.html?slug=${course.slug}" class="btn btn--outline btn--sm btn--full mt-4" data-i18n="academy_section.enroll">${i18n.t('academy_section.enroll')}</a>
        </div>
      `;
      this.coursesGrid.appendChild(card);
    });
  }

  getCategoryName(catId) {
    const cat = CourseCategories.find(c => c.id === catId);
    if (!cat) return '';
    return i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
  }
}

const page = new AcademyPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
