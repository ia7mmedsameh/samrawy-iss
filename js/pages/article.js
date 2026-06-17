/**
 * Single Article/Post Reader Page Controller
 */
import { ArticleCategories, Articles } from '../data/articles-data.js';
import i18n from '../i18n/i18n.js';
import AppState from '../core/state.js';
import App from '../core/app.js';

class ArticleDetailPage {
  constructor() {
    this.articleCategory = document.getElementById('article-category');
    this.articleTitle = document.getElementById('article-title');
    this.articleAuthor = document.getElementById('article-author');
    this.articleDate = document.getElementById('article-date');
    this.articleReadTime = document.getElementById('article-read-time');
    this.articleImg = document.getElementById('article-img');
    this.articleBody = document.getElementById('article-body');
    this.slug = new URLSearchParams(window.location.search).get('slug');
  }

  init() {
    if (!this.slug) {
      window.location.href = './blog.html';
      return;
    }

    const app = new App();
    app.init().then(() => {
      this.renderArticleDetails();

      AppState.on('currentLang', () => {
        this.renderArticleDetails();
      });
    });
  }

  renderArticleDetails() {
    const article = Articles.find(a => a.slug === this.slug);
    if (!article || article.status !== 'published') {
      window.location.href = './blog.html';
      return;
    }

    const category = ArticleCategories.find(c => c.id === article.category_id);
    const categoryName = category ? (i18n.currentLang === 'de' ? category.name_de : category.name_en) : '';
    const title = i18n.currentLang === 'de' ? article.title_de : article.title_en;
    const body = i18n.currentLang === 'de' ? article.content_de : article.content_en;

    document.title = `${title} | ISS SOLUTIONS`;

    if (this.articleCategory) this.articleCategory.textContent = categoryName;
    if (this.articleTitle) this.articleTitle.textContent = title;
    if (this.articleAuthor) this.articleAuthor.textContent = article.author;
    if (this.articleDate) this.articleDate.textContent = article.date;
    if (this.articleReadTime) this.articleReadTime.textContent = article.read_time;
    if (this.articleBody) this.articleBody.innerHTML = body;

    const imgUrl = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop';
    if (this.articleImg) {
      this.articleImg.src = imgUrl;
      this.articleImg.alt = title;
    }
  }
}

const page = new ArticleDetailPage();
document.addEventListener('DOMContentLoaded', () => page.init());
export default page;
