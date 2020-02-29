/* global APP_SIGN */

function cache(namespace) {
  return {
    getItem(key) {
      try {
        const valueWithExpire = localStorage.getItem(`${namespace}:${key}`);
        const { value, endTime } = JSON.parse(valueWithExpire);
        if(endTime && endTime <= new Date().getTime()) {
          this.removeItem(key);
          return null;
        }
        return value;
      } catch (e) {
        return null;
      }
    },
    setItem(key, value, endTime) {
      return localStorage.setItem(`${namespace}:${key}`, JSON.stringify({ value, endTime }));
    },
    removeItem(key) {
      return localStorage.removeItem(`${namespace}:${key}`);
    }
  }
}

/* global APP_SIGN */
window.g_cache = cache(APP_SIGN)
