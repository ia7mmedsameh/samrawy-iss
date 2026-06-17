/**
 * Category Overview Page Controller
 */
import { ProductCategories, Products } from '../data/products-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';

class CategoryPage {
  constructor() {
    this.categoryTitle = document.getElementById('category-title');
    this.categoryDesc = document.getElementById('category-desc');
    this.productsGrid = document.getElementById('category-products-grid');
    this.slug = new URLSearchParams(window.location.search).get('slug');
  }

  init() {
    if (!this.slug) {
      window.location.href = './products.html';
      return;
    }

    const app = new App();
    app.init().then(() => {
      this.renderCategoryDetails();
      
      AppState.on('currentLang', () => {
        this.renderCategoryDetails();
      });
    });
  }

  renderCategoryDetails() {
    const category = ProductCategories.find(c => c.slug === this.slug);
    if (!category) {
      window.location.href = './products.html';
      return;
    }

    const name = i18n.currentLang === 'de' ? category.name_de : category.name_en;
    const desc = i18n.currentLang === 'de' ? category.description_de : category.description_en;

    if (this.categoryTitle) this.categoryTitle.textContent = name;
    if (this.categoryDesc) this.categoryDesc.textContent = desc;

    document.title = `${name} | ISS SOLUTIONS`;

    this.renderProducts(category.id);
  }

  renderProducts(categoryId) {
    if (!this.productsGrid) return;
    this.productsGrid.innerHTML = '';

    const filtered = Products.filter(p => p.category_id === categoryId && p.status === 'active');

    if (filtered.length === 0) {
      this.productsGrid.innerHTML = `
        <div class="w-full text-center text-muted py-12" style="grid-column: 1 / -1;">
          <p data-i18n="common.no_results">${i18n.t('common.no_results')}</p>
        </div>
      `;
      return;
    }

    filtered.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'card card--product fade-in is-visible';
      
      const productName = i18n.currentLang === 'de' ? prod.name_de : prod.name_en;
      const productDesc = i18n.currentLang === 'de' ? prod.description_de : prod.description_en;

      card.innerHTML = `
        <div class="card__image">
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300&auto=format&fit=crop" alt="${productName}">
        </div>
        <div class="card__body">
          <h3 class="card__title"><a href="./product.html?slug=${prod.slug}">${productName}</a></h3>
          <p class="card__desc">${productDesc}</p>
          <a href="./product.html?slug=${prod.slug}" class="btn btn--outline btn--sm btn--full" data-i18n="common.learn_more">${i18n.t('common.learn_more')}</a>
        </div>
      `;
      this.productsGrid.appendChild(card);
    });
  }
}

const page = new CategoryPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
