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
    
    // Dynamically update SEO fields from product settings
    if (product.meta_title) {
      document.title = product.meta_title;
    } else {
      document.title = `${productName} | ISS SOLUTIONS`;
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = product.meta_description || productDesc;

    // Open Graph SEO support
    this._updateOGMeta('og:title', product.meta_title || `${productName} | ISS SOLUTIONS`);
    this._updateOGMeta('og:description', product.meta_description || productDesc);
    if (product.images && product.images[0]) {
      this._updateOGMeta('og:image', product.images[0]);
    }
    this._updateCanonical(product.canonical_url || window.location.href);

    if (this.productCategoryLabel) this.productCategoryLabel.textContent = categoryName;
    if (this.productTitle) this.productTitle.textContent = productName;
    if (this.productDesc) this.productDesc.textContent = productDesc;

    // Render image and thumbs (multiple images support)
    const images = product.images && product.images.length > 0 ? product.images : [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'
    ];
    
    if (this.productMainImg) {
      this.productMainImg.src = images[0];
      this.productMainImg.alt = productName;
    }

    if (this.productThumbs) {
      this.productThumbs.innerHTML = images.map((img, idx) => `
        <div class="product-gallery__thumb ${idx === 0 ? 'is-active' : ''}" data-src="${img}">
          <img src="${img}" alt="${productName} View ${idx + 1}">
        </div>
      `).join('');
      
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
          const prettyKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          row.innerHTML = `
            <td>${prettyKey}</td>
            <td>${val}</td>
          `;
          this.productSpecsBody.appendChild(row);
        });
      }
    }

    // Render Dynamic Downloads
    const downloadsList = document.getElementById('product-downloads-list');
    if (downloadsList) {
      downloadsList.innerHTML = '';
      if (product.pdf_files && product.pdf_files.length > 0) {
        product.pdf_files.forEach(file => {
          const fileName = i18n.currentLang === 'de' ? file.name_de : file.name_en;
          const item = document.createElement('div');
          item.className = 'download-item';
          item.innerHTML = `
            <div class="download-item__info">
              <div class="download-item__icon">PDF</div>
              <div>
                <div class="download-item__name">${fileName}</div>
                <div class="download-item__size">PDF — ${file.size}</div>
              </div>
            </div>
            <a href="${file.url}" class="btn btn--outline btn--sm" data-i18n="common.download">${i18n.t('common.download')}</a>
          `;
          downloadsList.appendChild(item);
        });
      } else {
        downloadsList.innerHTML = `<p class="text-muted" style="grid-column: 1/-1;">${i18n.currentLang === 'de' ? 'Keine Dokumente verfügbar.' : 'No documents available.'}</p>`;
      }
    }

    // Render Related Products
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
      relatedGrid.innerHTML = '';
      if (product.related_products && product.related_products.length > 0) {
        product.related_products.forEach(relSlug => {
          const relProd = Products.find(p => p.slug === relSlug);
          if (relProd && relProd.status === 'active') {
            const relName = i18n.currentLang === 'de' ? relProd.name_de : relProd.name_en;
            const relDesc = i18n.currentLang === 'de' ? relProd.description_de : relProd.description_en;
            const relImg = relProd.images && relProd.images[0] ? relProd.images[0] : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300&auto=format&fit=crop';
            const relCat = ProductCategories.find(c => c.id === relProd.category_id);
            const relCatName = relCat ? (i18n.currentLang === 'de' ? relCat.name_de : relCat.name_en) : '';

            const card = document.createElement('div');
            card.className = 'card card--product';
            card.innerHTML = `
              <div class="card__image">
                <img src="${relImg}" alt="${relName}">
              </div>
              <div class="card__body">
                <div class="card__category">${relCatName}</div>
                <h3 class="card__title"><a href="./product.html?slug=${relProd.slug}">${relName}</a></h3>
                <p class="card__desc">${relDesc}</p>
                <a href="./product.html?slug=${relProd.slug}" class="btn btn--outline btn--sm btn--full" data-i18n="common.learn_more">${i18n.t('common.learn_more')}</a>
              </div>
            `;
            relatedGrid.appendChild(card);
          }
        });
      } else {
        const relatedSection = document.querySelector('.related-products');
        if (relatedSection) relatedSection.style.display = 'none';
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

  _updateOGMeta(property, content) {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.content = content;
  }

  _updateCanonical(url) {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.rel = 'canonical';
      document.head.appendChild(el);
    }
    el.href = url;
  }
}

const page = new ProductDetailPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
