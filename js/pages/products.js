/**
 * Products Listing Page Controller
 */
import { ProductCategories, Products } from '../data/products-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';

class ProductsPage {
  constructor() {
    this.categoryTabs = document.getElementById('category-tabs');
    this.productsGrid = document.getElementById('products-grid');
    this.searchInput = document.getElementById('search-input');
    this.activeCategory = 'all';
    this.searchQuery = '';
  }

  init() {
    // Initialize standard page scripts
    const app = new App();
    app.init().then(() => {
      this.renderCategories();
      this.renderProducts();
      this.bindEvents();
    });
  }

  renderCategories() {
    if (!this.categoryTabs) return;

    // Remove existing dynamic tabs
    const staticTabs = Array.from(this.categoryTabs.querySelectorAll('.filter-tab'));
    
    // Inject Categories
    ProductCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-tab';
      btn.dataset.category = cat.id;
      // Get translations dynamically
      btn.textContent = i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
      this.categoryTabs.appendChild(btn);
    });

    // Listen for state change (lang change) to update tab names
    AppState.on('currentLang', () => {
      this.updateTranslations();
    });
  }

  updateTranslations() {
    const tabs = this.categoryTabs.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      const catId = tab.dataset.category;
      if (catId === 'all') return;
      const cat = ProductCategories.find(c => c.id === catId);
      if (cat) {
        tab.textContent = i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
      }
    });
    this.renderProducts();
  }

  bindEvents() {
    // Category tabs click
    this.categoryTabs?.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      this.categoryTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      this.activeCategory = tab.dataset.category;
      this.renderProducts();
    });

    // Search input
    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderProducts();
    });
  }

  renderProducts() {
    if (!this.productsGrid) return;

    this.productsGrid.innerHTML = '';

    // Filter products
    const filtered = Products.filter(prod => {
      const matchesCategory = this.activeCategory === 'all' || prod.category_id === this.activeCategory;
      
      const name = (i18n.currentLang === 'de' ? prod.name_de : prod.name_en).toLowerCase();
      const desc = (i18n.currentLang === 'de' ? prod.description_de : prod.description_en).toLowerCase();
      const matchesSearch = name.includes(this.searchQuery) || desc.includes(this.searchQuery);

      return matchesCategory && matchesSearch && prod.status === 'active';
    });

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
      
      const categoryName = this.getCategoryName(prod.category_id);
      const productName = i18n.currentLang === 'de' ? prod.name_de : prod.name_en;
      const productDesc = i18n.currentLang === 'de' ? prod.description_de : prod.description_en;
      
      card.innerHTML = `
        <div class="card__image">
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300&auto=format&fit=crop" alt="${productName}">
        </div>
        <div class="card__body">
          <div class="card__category">${categoryName}</div>
          <h3 class="card__title"><a href="./product.html?slug=${prod.slug}">${productName}</a></h3>
          <p class="card__desc">${productDesc}</p>
          <a href="./product.html?slug=${prod.slug}" class="btn btn--outline btn--sm btn--full" data-i18n="common.learn_more">${i18n.t('common.learn_more')}</a>
        </div>
      `;
      this.productsGrid.appendChild(card);
    });
  }

  getCategoryName(catId) {
    const cat = ProductCategories.find(c => c.id === catId);
    if (!cat) return '';
    return i18n.currentLang === 'de' ? cat.name_de : cat.name_en;
  }
}

// Instantiate
const page = new ProductsPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
