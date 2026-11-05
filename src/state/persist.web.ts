/** Web: browser localStorage. Skipped during server rendering (no window). */
const storage = () => (typeof window === 'undefined' ? undefined : window.localStorage);

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = storage()?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key: string, value: unknown) {
  try {
    storage()?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the data stays in memory for this session.
  }
}
