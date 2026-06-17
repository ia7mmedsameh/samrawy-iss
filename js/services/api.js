/**
 * API Service
 * Abstraction layer for data fetching.
 * Currently returns static data, ready to swap with Supabase.
 */
import AppConfig from '../core/config.js';

class ApiService {
  constructor() {
    this._baseUrl = AppConfig.SUPABASE_URL;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Generic fetch wrapper with error handling
   * @param {string} endpoint
   * @param {object} options
   * @returns {Promise<any>}
   */
  async _fetch(endpoint, options = {}) {
    try {
      const url = `${this._baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: { ...this._headers, ...options.headers },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[API]', error);
      throw error;
    }
  }

  /** GET request */
  async get(endpoint) {
    return this._fetch(endpoint, { method: 'GET' });
  }

  /** POST request */
  async post(endpoint, data) {
    return this._fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Singleton
const api = new ApiService();
export default api;
