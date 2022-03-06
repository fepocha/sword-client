export const LocalStorage = <Value>(key: string) => ({
  get: (): Value | null => JSON.parse(window.localStorage.getItem(key) || "null"),
  set:(value: Value) => window.localStorage.setItem(key, JSON.stringify(value)),
  remove: () => window.localStorage.removeItem(key),
});
