"use client";

import { useCallback, useEffect, useState } from "react";

/** A small string-id list persisted to localStorage — backs shortlist & compare. */
export function useLocalStorageList(key: string, max?: number) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen post-mount (it's unavailable during
    // SSR) — this is the standard hydrate-from-browser-storage effect, not
    // state derived from props/state, so the usual "avoid setState in
    // effect" guidance doesn't apply here.
    try {
      const raw = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      setIds(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // storage unavailable — state still updates in-memory
      }
    },
    [key],
  );

  const add = useCallback(
    (id: string) => {
      setIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = max ? [...prev, id].slice(-max) : [...prev, id];
        persist(next);
        return next;
      });
    },
    [max, persist],
  );

  const remove = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = prev.filter((x) => x !== id);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : max ? [...prev, id].slice(-max) : [...prev, id];
        persist(next);
        return next;
      });
    },
    [max, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);
  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, hydrated, add, remove, toggle, clear, has, isFull: max ? ids.length >= max : false };
}
