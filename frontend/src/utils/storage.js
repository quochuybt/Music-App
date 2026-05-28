export const storage = {
  getItem(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
};
