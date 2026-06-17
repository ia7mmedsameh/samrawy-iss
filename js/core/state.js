/**
 * Simple Reactive State Manager
 * Lightweight pub/sub state management for the application.
 */
class StateManager {
  constructor(initialState = {}) {
    this._state = { ...initialState };
    this._listeners = new Map();
    this._globalListeners = [];
  }

  /** Get current state or a specific key */
  get(key) {
    if (key) return this._state[key];
    return { ...this._state };
  }

  /** Set state and notify listeners */
  set(key, value) {
    const oldValue = this._state[key];
    if (oldValue === value) return;

    this._state[key] = value;

    // Notify key-specific listeners
    if (this._listeners.has(key)) {
      this._listeners.get(key).forEach(cb => cb(value, oldValue, key));
    }

    // Notify global listeners
    this._globalListeners.forEach(cb => cb(key, value, oldValue));
  }

  /** Subscribe to a specific key change */
  on(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, []);
    }
    this._listeners.get(key).push(callback);

    // Return unsubscribe function
    return () => {
      const cbs = this._listeners.get(key);
      const idx = cbs.indexOf(callback);
      if (idx > -1) cbs.splice(idx, 1);
    };
  }

  /** Subscribe to all state changes */
  onAny(callback) {
    this._globalListeners.push(callback);
    return () => {
      const idx = this._globalListeners.indexOf(callback);
      if (idx > -1) this._globalListeners.splice(idx, 1);
    };
  }
}

// Singleton application state
const AppState = new StateManager({
  currentLang: 'de',
  isMenuOpen: false,
  isLoading: true,
  currentPage: 'home',
});

export { StateManager };
export default AppState;
