// AsyncStorage 웹 환경용 stub (localStorage 사용)
const AsyncStorage = {
  getItem: async (key: string) => localStorage.getItem(key),
  setItem: async (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: async (key: string) => localStorage.removeItem(key),
  clear: async () => localStorage.clear(),
  getAllKeys: async () => Object.keys(localStorage),
  multiGet: async (keys: string[]) => keys.map(k => [k, localStorage.getItem(k)]),
  multiSet: async (pairs: [string, string][]) => pairs.forEach(([k, v]) => localStorage.setItem(k, v)),
  multiRemove: async (keys: string[]) => keys.forEach(k => localStorage.removeItem(k)),
};

export default AsyncStorage;
