/**
 * Minimal i18n for the marketplace and payments modules (no extra dependency).
 *
 *   const t = useT();
 *   t('marketplace.list.title')
 *   t('marketplace.list.location', { town, district, km })
 *   t('marketplace.list.productCount', { count: 3 })   // picks one/other
 *
 * Keys are type-checked against the English dictionary. Other languages fall
 * back to English for any missing key.
 */
import { useSyncExternalStore } from 'react';

import { en } from './en';

type Plural = { readonly one: string; readonly other: string };

/** Same shape as the English dictionary, with any string values (for translations). */
type Widen<T> = T extends string ? string : T extends Plural ? Plural : { [K in keyof T]: Widen<T[K]> };
export type Dictionary = Widen<typeof en>;

/** Every dotted key path that ends at a string or a plural entry. */
type KeyPaths<T> = {
  [K in keyof T & string]: T[K] extends string | Plural ? K : `${K}.${KeyPaths<T[K]>}`;
}[keyof T & string];
export type TranslationKey = KeyPaths<typeof en>;

type Params = Record<string, string | number>;

const dictionaries = { en } satisfies Record<string, Dictionary>;
export type Language = keyof typeof dictionaries;

// ── Current language (module-level store, no provider needed) ────────────────

let current: Language = 'en';
const listeners = new Set<() => void>();

export function setLanguage(language: Language) {
  current = language;
  listeners.forEach((l) => l());
}

export function useLanguage(): Language {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => current,
    () => current,
  );
}

// ── Lookup ───────────────────────────────────────────────────────────────────

function lookup(dict: object, key: string): unknown {
  return key.split('.').reduce<unknown>(
    (node, part) => (node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined),
    dict,
  );
}

function isPlural(value: unknown): value is Plural {
  return !!value && typeof value === 'object' && 'one' in value && 'other' in value;
}

export function translate(language: Language, key: TranslationKey, params?: Params): string {
  let value = lookup(dictionaries[language], key);
  if (value === undefined) value = lookup(dictionaries.en, key);

  if (isPlural(value)) {
    value = params?.count === 1 ? value.one : value.other;
  }
  if (typeof value !== 'string') return key;

  return params
    ? value.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in params ? String(params[name]) : match,
      )
    : value;
}

/** Returns `t()` for the current language; components re-render when it changes. */
export function useT() {
  const language = useLanguage();
  return (key: TranslationKey, params?: Params) => translate(language, key, params);
}
