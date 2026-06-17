/**
 * Product Details Page Controller
 */
import { ProductCategories, Products } from '../data/products-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';

class ProductDetailPage {
  constructor() {
    this.productMainImg = document.getElementById('product-main-img');
    this.productThumbs = document.getElementById('product-thumbs');
    this.productCategoryLabel = document.getElementById('product-category-label');
    this.productTitle = document.getElementById('product-title');
    this.productDesc = document.getElementById('product-desc');
    this.productFeaturesList = document.getElementById('product-features-list');
    this.productSpecsBody = document.getElementById('product-specs-body');
    
    this.slug = new URLSearchParams(window.location.search).get('slug');
  }

  init() {
    if (!this.slug) {
      window.location.href = './products.html';
      return;
    }

    const app = new App();
    app.init().then(() => {
      this.renderProductDetails();

      AppState.on('currentLang', () => {
        this.renderProductDetails();
      });
    });
  }

  renderProductDetails() {
    const product = Products.find(p => p.slug === this.slug);
    if (!product || product.status !== 'active') {
      window.location.href = './products.html';
      return;
    }

    const category = ProductCategories.find(c => c.id === product.category_id);
    const categoryName = category ? (i18n.currentLang === 'de' ? category.name_de : category.name_en) : '';
    const productName = i18n.currentLang === 'de' ? product.name_de : product.name_en;
    const productDesc = i18n.currentLang === 'de' ? product.description_de : product.description_en;
    
    document.title = `${productName} | ISS SOLUTIONS`;

    if (this.productCategoryLabel) this.productCategoryLabel.textContent = categoryName;
    if (this.productTitle) this.productTitle.textContent = productName;
    if (this.productDesc) this.productDesc.textContent = productDesc;

    // Render image and thumbs (placeholder setups)
    const imgUrl = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop';
    if (this.productMainImg) {
      this.productMainImg.src = imgUrl;
      this.productMainImg.alt = productName;
    }

    if (this.productThumbs) {
      this.productThumbs.innerHTML = `
        <div class="product-gallery__thumb is-active" data-src="${imgUrl}">
          <img src="${imgUrl}" alt="${productName} View 1">
        </div>
        <div class="product-gallery__thumb" data-src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop" alt="${productName} View 2">
        </div>
      `;
      // Re-init gallery switcher script
      this.initGallerySwitcher();
    }

    // Render Features
    if (this.productFeaturesList) {
      this.productFeaturesList.innerHTML = '';
      const features = i18n.currentLang === 'de' ? product.features_de : product.features_en;
      if (features) {
        features.forEach(feat => {
          const el = document.createElement('div');
          el.className = 'product-feature-item';
          el.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${feat}</span>
          `;
          this.productFeaturesList.appendChild(el);
        });
      }
    }

    // Render Specs
    if (this.productSpecsBody) {
      this.productSpecsBody.innerHTML = '';
      if (product.specs) {
        Object.entries(product.specs).forEach(([key, val]) => {
          const row = document.createElement('tr');
          // Simple key prettifier
          const prettyKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          row.innerHTML = `
            <td>${prettyKey}</td>
            <td>${val}</td>
          `;
          this.productSpecsBody.appendChild(row);
        });
      }
    }
  }

  initGallerySwitcher() {
    const mainImg = this.productMainImg;
    const thumbs = this.productThumbs?.querySelectorAll('.product-gallery__thumb');
    
    thumbs?.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.src;
        if (src && mainImg) {
          mainImg.src = src;
          thumbs.forEach(t => t.classList.remove('is-active'));
          thumb.classList.add('is-active');
        }
      });
    });
  }
}

const page = new ProductDetailPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
