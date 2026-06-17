/**
 * Administrative Dashboard Controller
 * Implements mockup state, permission checking, tab switching, and modal editing
 */
import { ProductCategories, Products } from '../data/products-data.js';
import { CourseCategories, Courses } from '../data/courses-data.js';
import Toast from '../components/toast.js';

// Simulated database state for Leads & Media Library (mock data for dashboard)
const MockAgentApplications = [
  { id: 1, company: 'Nordic Bau GmbH', contact: 'Erik Larsen', email: 'erik@nordicbau.no', country: 'Norway', date: '2026-06-15', status: 'pending' },
  { id: 2, company: 'Al-Farabi Construction', contact: 'Ahmed Ali', email: 'ahmed@farabi.sa', country: 'Saudi Arabia', date: '2026-06-14', status: 'reviewed' },
  { id: 3, company: 'Zeta Polymers Ltd', contact: 'Chloe Bennett', email: 'chloe@zetapoly.co.uk', country: 'United Kingdom', date: '2026-06-10', status: 'approved' },
];

const MockContactMessages = [
  { id: 1, name: 'Hans Müller', email: 'hans.m@gmail.de', subject: 'Inquiry on Microcement', message: 'Hello, what is the curing time of microcement protection sealers?', date: '2026-06-16' },
  { id: 2, name: 'Clara Oswald', email: 'clara@oswald.com', subject: 'Technical Data Sheets request', message: 'Please send the German safety datasheet for Astromic Systems.', date: '2026-06-15' },
];

const MockMediaLibrary = [
  { id: '1', filename: 'acrylic_gallery1.jpg', file_path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop', file_type: 'image/jpeg', file_size: '184 KB' },
  { id: '2', filename: 'epoxy_floor.jpg', file_path: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop', file_type: 'image/jpeg', file_size: '220 KB' },
  { id: '3', filename: 'industrial_site.jpg', file_path: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop', file_type: 'image/jpeg', file_size: '310 KB' },
  { id: '4', filename: 'acrylic_datasheet.pdf', file_path: '#', file_type: 'application/pdf', file_size: '1.2 MB' },
];

// Define role capabilities/permissions
const RolePermissions = {
  super_admin: ['overview', 'products', 'academy', 'media', 'leads', 'seo'],
  content_manager: ['overview', 'products', 'academy', 'media', 'seo'],
  product_manager: ['overview', 'products', 'media'],
  academy_manager: ['overview', 'academy', 'media'],
  marketing_manager: ['overview', 'leads', 'media', 'seo']
};

class AdminDashboard {
  constructor() {
    this.session = null;
    this.activeTab = 'overview';
    this.currentEditProduct = null;
  }

  init() {
    // 1. Authenticate check
    const rawSession = localStorage.getItem('iss_admin_session');
    if (!rawSession) {
      window.location.href = './login.html';
      return;
    }

    this.session = JSON.parse(rawSession);
    if (!this.session.loggedIn) {
      window.location.href = './login.html';
      return;
    }

    // 2. Set user credentials in sidebar
    document.getElementById('sidebar-user-name').textContent = this.session.username;
    document.getElementById('sidebar-user-role').textContent = this.session.role.replace('_', ' ');

    // 3. Bind navigation events
    this.bindNavigation();

    // 4. Initial rendering
    this.renderActivePanel();
    this.renderStats();

    // 5. Bind logout button
    document.getElementById('admin-logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('iss_admin_session');
      window.location.href = './login.html';
    });

    // 6. Bind Modal buttons
    this.bindEditorModal();
  }

  bindNavigation() {
    const links = document.querySelectorAll('.admin-sidebar__link[data-tab]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.dataset.tab;
        
        // Remove active class from other links
        links.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');

        this.activeTab = tab;
        this.renderActivePanel();
      });
    });

    // Bind Overview view all leads redirect
    document.getElementById('view-all-leads-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      const leadsLink = document.querySelector('.admin-sidebar__link[data-tab="leads"]');
      if (leadsLink) leadsLink.click();
    });
  }

  renderActivePanel() {
    const pageTitle = document.getElementById('page-display-title');
    if (pageTitle) pageTitle.textContent = this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1);

    // Hide all panels
    document.querySelectorAll('.admin-panel-section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById('access-denied-panel').style.display = 'none';

    // Verify permission rules
    const allowedTabs = RolePermissions[this.session.role] || [];
    if (!allowedTabs.includes(this.activeTab)) {
      document.getElementById('denied-module-name').textContent = this.activeTab.toUpperCase();
      document.getElementById('access-denied-panel').style.display = 'block';
      return;
    }

    // Display correct panel
    const panel = document.getElementById(`panel-${this.activeTab}`);
    if (panel) panel.style.display = 'block';

    // Populate tab data
    if (this.activeTab === 'overview') this.renderOverviewLists();
    if (this.activeTab === 'products') this.renderProductsList();
    if (this.activeTab === 'academy') this.renderCoursesList();
    if (this.activeTab === 'media') this.renderMediaGrid();
    if (this.activeTab === 'leads') this.renderLeadsLists();
  }

  renderStats() {
    document.getElementById('stat-products-count').textContent = Products.length;
    document.getElementById('stat-courses-count').textContent = Courses.length;
    document.getElementById('stat-leads-count').textContent = MockAgentApplications.length + MockContactMessages.length;
    document.getElementById('stat-media-count').textContent = MockMediaLibrary.length;
  }

  renderOverviewLists() {
    // Recent Leads
    const recentLeads = document.getElementById('recent-leads-list');
    if (recentLeads) {
      recentLeads.innerHTML = '';
      const allLeads = [
        ...MockAgentApplications.map(a => ({ name: a.contact, type: 'Agent Application', date: a.date, status: a.status })),
        ...MockContactMessages.map(c => ({ name: c.name, type: 'Contact Message', date: c.date, status: 'active' }))
      ].slice(0, 5);

      allLeads.forEach(lead => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${lead.name}</td>
          <td>${lead.type}</td>
          <td>${lead.date}</td>
          <td><span class="status-badge status-badge--${lead.status}">${lead.status}</span></td>
        `;
        recentLeads.appendChild(tr);
      });
    }

    // Recent drafts and catalog status
    const recentDrafts = document.getElementById('recent-drafts-list');
    if (recentDrafts) {
      recentDrafts.innerHTML = '';
      const items = [
        ...Products.map(p => ({ name: p.name_en, type: 'Product', status: p.status })),
        ...Courses.map(c => ({ name: c.name_en, type: 'Course', status: c.status }))
      ].slice(0, 5);

      items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td><span class="status-badge status-badge--${item.status}">${item.status}</span></td>
        `;
        recentDrafts.appendChild(tr);
      });
    }
  }

  renderProductsList() {
    const list = document.getElementById('admin-products-list');
    if (!list) return;
    list.innerHTML = '';

    Products.forEach(prod => {
      const cat = ProductCategories.find(c => c.id === prod.category_id);
      const catName = cat ? cat.name_en : 'General';
      const img = prod.images && prod.images[0] ? prod.images[0] : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=100&auto=format&fit=crop';
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${img}" alt="${prod.name_en}" class="table-img"></td>
        <td>
          <strong>${prod.name_en}</strong><br>
          <span class="text-small text-muted">${prod.name_de}</span>
        </td>
        <td>${catName}</td>
        <td>${prod.order || 1}</td>
        <td><span class="status-badge status-badge--${prod.status}">${prod.status}</span></td>
        <td>
          <button class="btn btn--outline btn--sm edit-p-btn" data-slug="${prod.slug}">Edit</button>
        </td>
      `;
      list.appendChild(tr);
    });

    // Bind edit product clicks
    list.querySelectorAll('.edit-p-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openEditProductModal(btn.dataset.slug);
      });
    });
  }

  renderCoursesList() {
    const list = document.getElementById('admin-courses-list');
    if (!list) return;
    list.innerHTML = '';

    Courses.forEach(course => {
      const price = course.is_free ? 'Free' : `€${course.course_price}`;
      const limit = course.enrollment_limit ? `${course.enrollment_limit} Seats` : 'Unlimited';
      const cert = course.certificate_enabled ? 'Yes' : 'No';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <strong>${course.name_en}</strong><br>
          <span class="text-small text-muted">${course.name_de}</span>
        </td>
        <td>${course.instructor}</td>
        <td>${price}</td>
        <td>${limit}</td>
        <td>${cert}</td>
        <td><span class="status-badge status-badge--${course.status}">${course.status}</span></td>
        <td>
          <button class="btn btn--outline btn--sm" onclick="alert('Academy course details are fully future-proofed with certificate and profile options.')">Edit</button>
        </td>
      `;
      list.appendChild(tr);
    });
  }

  renderMediaGrid() {
    const grid = document.getElementById('admin-media-grid');
    if (!grid) return;
    grid.innerHTML = '';

    MockMediaLibrary.forEach(media => {
      const item = document.createElement('div');
      item.className = 'media-item';
      
      if (media.file_type.startsWith('image/')) {
        item.innerHTML = `
          <img src="${media.file_path}" alt="${media.filename}">
          <div class="media-item__info">${media.filename} (${media.file_size})</div>
        `;
      } else {
        item.innerHTML = `
          <div class="media-item__doc">PDF</div>
          <div class="media-item__info">${media.filename} (${media.file_size})</div>
        `;
      }
      
      item.addEventListener('click', () => {
        alert(`Filename: ${media.filename}\nType: ${media.file_type}\nSize: ${media.file_size}\nPath: ${media.file_path}`);
      });
      grid.appendChild(item);
    });

    // Handle Upload Simulator
    const uploader = document.getElementById('media-upload-input');
    if (uploader) {
      uploader.onchange = () => {
        const files = uploader.files;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const sizeStr = (file.size / 1024).toFixed(1) + ' KB';
            
            MockMediaLibrary.push({
              id: String(MockMediaLibrary.length + 1),
              filename: file.name,
              file_path: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop', // mock link
              file_type: file.type || 'image/jpeg',
              file_size: sizeStr
            });
          }
          Toast.show({
            type: 'success',
            title: 'Upload Successful',
            message: 'Files uploaded successfully to Centralized Media Library.'
          });
          this.renderMediaGrid();
          this.renderStats();
        }
      };
    }
  }

  renderLeadsLists() {
    // Agent applications
    const agentsList = document.getElementById('admin-agent-applications-list');
    if (agentsList) {
      agentsList.innerHTML = '';
      MockAgentApplications.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${app.company}</strong></td>
          <td>${app.contact}</td>
          <td>${app.email}</td>
          <td>${app.country}</td>
          <td>${app.date}</td>
          <td><span class="status-badge status-badge--${app.status}">${app.status}</span></td>
        `;
        agentsList.appendChild(tr);
      });
    }

    // Contact messages
    const contactsList = document.getElementById('admin-contact-messages-list');
    if (contactsList) {
      contactsList.innerHTML = '';
      MockContactMessages.forEach(msg => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${msg.name}</strong></td>
          <td>${msg.email}</td>
          <td>${msg.subject}</td>
          <td>${msg.message}</td>
          <td>${msg.date}</td>
        `;
        contactsList.appendChild(tr);
      });
    }
  }

  // MODAL LOGIC
  bindEditorModal() {
    const modal = document.getElementById('product-modal');
    const backdrop = document.getElementById('product-modal-backdrop');
    const closeBtn = document.getElementById('product-modal-close');
    const form = document.getElementById('product-editor-form');

    const closeModal = () => {
      modal.classList.remove('is-active');
      backdrop.classList.remove('is-active');
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    // Modal Tabs logic
    const tabs = document.querySelectorAll('.modal-tabs__btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const panel = tab.dataset.modalTab;
        document.querySelectorAll('.modal-tab-panel').forEach(p => {
          p.style.display = p.dataset.modalPanel === panel ? 'block' : 'none';
        });
      });
    });

    // Form Submit
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProductChanges();
      closeModal();
    });

    // Global SEO form simulation
    document.getElementById('global-seo-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      Toast.show({
        type: 'success',
        title: 'SEO Configurations Saved',
        message: 'Default meta tags, Open Graph parameters, and Structured Data updated successfully.'
      });
    });

    // Add Product button triggers empty modal
    document.getElementById('add-product-btn')?.addEventListener('click', () => {
      this.currentEditProduct = null;
      document.getElementById('product-modal-title').textContent = 'Add New Product';
      form.reset();
      
      // Reset tabs
      tabs[0].click();
      
      modal.classList.add('is-active');
      backdrop.classList.add('is-active');
    });
  }

  openEditProductModal(slug) {
    const product = Products.find(p => p.slug === slug);
    if (!product) return;

    this.currentEditProduct = product;
    document.getElementById('product-modal-title').textContent = `Edit Product: ${product.name_en}`;

    // Populate Fields
    document.getElementById('edit-product-slug').value = product.slug;
    document.getElementById('p-name-de').value = product.name_de;
    document.getElementById('p-name-en').value = product.name_en;
    document.getElementById('p-category').value = product.category_id;
    document.getElementById('p-order').value = product.order || 1;
    document.getElementById('p-desc-de').value = product.description_de || '';
    document.getElementById('p-desc-en').value = product.description_en || '';
    document.getElementById('p-status').value = product.status;
    document.getElementById('p-featured').checked = !!product.is_featured;

    // Media and SEO fields
    document.getElementById('p-images').value = (product.images || []).join(', ');
    document.getElementById('p-meta-title').value = product.meta_title || '';
    document.getElementById('p-meta-desc').value = product.meta_description || '';
    document.getElementById('p-seo-slug').value = product.seo_slug || '';
    document.getElementById('p-canonical').value = product.canonical_url || '';

    // PDFs
    const pdfList = document.getElementById('p-pdf-list');
    if (pdfList) {
      pdfList.innerHTML = (product.pdf_files || []).map(file => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; font-size: 13px;">
          <span>📄 ${file.name_en} (${file.size})</span>
          <a href="#" style="color: var(--error);" onclick="event.preventDefault(); this.parentElement.remove()">Unlink</a>
        </div>
      `).join('');
    }

    // Reset tabs view
    document.querySelectorAll('.modal-tabs__btn')[0].click();

    // Show modal
    document.getElementById('product-modal').classList.add('is-active');
    document.getElementById('product-modal-backdrop').classList.add('is-active');
  }

  saveProductChanges() {
    const slug = document.getElementById('edit-product-slug').value;
    
    // Find or create product
    let product = Products.find(p => p.slug === slug);
    const isNew = !product;

    if (isNew) {
      product = {
        id: 'p-' + Math.random().toString(36).substr(2, 9),
        slug: document.getElementById('p-name-en').value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        specs: {},
        pdf_files: [],
        related_products: []
      };
    }

    product.name_de = document.getElementById('p-name-de').value;
    product.name_en = document.getElementById('p-name-en').value;
    product.category_id = document.getElementById('p-category').value;
    product.order = parseInt(document.getElementById('p-order').value, 10) || 1;
    product.description_de = document.getElementById('p-desc-de').value;
    product.description_en = document.getElementById('p-desc-en').value;
    product.status = document.getElementById('p-status').value;
    product.is_featured = document.getElementById('p-featured').checked;

    // Media & SEO
    const imgsRaw = document.getElementById('p-images').value;
    product.images = imgsRaw ? imgsRaw.split(',').map(s => s.trim()) : [];
    
    product.meta_title = document.getElementById('p-meta-title').value;
    product.meta_description = document.getElementById('p-meta-desc').value;
    product.seo_slug = document.getElementById('p-seo-slug').value;
    product.canonical_url = document.getElementById('p-canonical').value;

    if (isNew) {
      Products.push(product);
    }

    // Keep active products ordered
    Products.sort((a, b) => (a.order || 0) - (b.order || 0));

    Toast.show({
      type: 'success',
      title: isNew ? 'Product Created' : 'Product Updated',
      message: `Product "${product.name_en}" saved successfully to catalog.`
    });

    this.renderProductsList();
    this.renderStats();
  }
}

const dashboard = new AdminDashboard();
document.addEventListener('DOMContentLoaded', () => dashboard.init());
export default dashboard;
