/**
 * Blog/News Listing Page Controller
 */
import { ArticleCategories, Articles } from '../data/articles-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';

class BlogPage {
  constructor() {
    this.categoryTabs = document.getElementById('article-category-tabs');
    this.articlesGrid = document.getElementById('articles-grid');
    this.activeCategory = 'all';
  }

  init() {
    const app = new App();
    app.init().then(() => {
      this.renderCategories();
      this.renderArticles();
      this.bindEvents();
    });
  }

  renderCategories() {
    if (!this.categoryTabs) return;

    ArticleCategories.forEach(cat => {
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
      const cat = ArticleCategories.find(c => c.id === catId);
      if (cat) {
        tab.textContent = i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
      }
    });
    this.renderArticles();
  }

  bindEvents() {
    this.categoryTabs?.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      this.categoryTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      this.activeCategory = tab.dataset.category;
      this.renderArticles();
    });
  }

  renderArticles() {
    if (!this.articlesGrid) return;
    this.articlesGrid.innerHTML = '';

    const filtered = Articles.filter(art => {
      const matchesCategory = this.activeCategory === 'all' || art.category_id === this.activeCategory;
      return matchesCategory && art.status === 'published';
    });

    if (filtered.length === 0) {
      this.articlesGrid.innerHTML = `
        <div class="w-full text-center text-muted py-12" style="grid-column: 1 / -1;">
          <p data-i18n="common.no_results">${i18n.t('common.no_results')}</p>
        </div>
      `;
      return;
    }

    filtered.forEach(art => {
      const card = document.createElement('div');
      card.className = 'article-card fade-in is-visible';

      const title = i18n.currentLang === 'de' ? art.title_de : art.title_en;
      const excerpt = i18n.currentLang === 'de' ? art.excerpt_de : art.excerpt_en;
      const categoryName = this.getCategoryName(art.category_id);

      card.innerHTML = `
        <div class="article-card__image">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop" alt="${title}">
        </div>
        <div class="article-card__body">
          <span class="article-card__category">${categoryName}</span>
          <h3 class="article-card__title"><a href="./article.html?slug=${art.slug}">${title}</a></h3>
          <p class="article-card__excerpt">${excerpt}</p>
          <div class="article-card__footer">
            <span class="article-card__date">${art.date}</span>
            <a href="./article.html?slug=${art.slug}" class="text-link text-link--underline" data-i18n="articles_section.read_more">${i18n.t('articles_section.read_more')}</a>
          </div>
        </div>
      `;
      this.articlesGrid.appendChild(card);
    });
  }

  getCategoryName(catId) {
    const cat = ArticleCategories.find(c => c.id === catId);
    if (!cat) return '';
    return i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
  }
}

const page = new BlogPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
