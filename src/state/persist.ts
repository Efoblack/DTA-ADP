/**
 * On-phone storage for offline-first data (native: expo-sqlite key-value store).
 * Web uses persist.web.ts (localStorage) so the web build never loads SQLite.
 */
import Storage from 'expo-sqlite/kv-store';

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = Storage.getItemSync(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key: string, value: unknown) {
  try {
    Storage.setItemSync(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the data stays in memory for this session.
  }
}
