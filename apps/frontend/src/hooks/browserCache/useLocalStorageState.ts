"use client";

// see: https://github.com/imbhargav5/rooks/blob/main/packages/rooks/src/hooks/useLocalStorageState.ts
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";

export type LocalStorageKey =
  | "paletteMode"
  | "themeKey"
  | "token"
  | (string & Record<never, never>);

function getValueFromLocalStorage(key: LocalStorageKey): unknown {
  if (typeof localStorage === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(key) ?? "null";
  try {
    return JSON.parse(storedValue);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return storedValue;
}

function saveValueToLocalStorage<S>(
  key: LocalStorageKey,
  value: S,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): null | void {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @param key - Key of the localStorage object
 * @param initialState - Default initial value
 */
function initialize<S>(
  key: LocalStorageKey,
  initialState: S | (() => S),
): unknown {
  const valueLoadedFromLocalStorage = getValueFromLocalStorage(key);
  if (valueLoadedFromLocalStorage === null) {
    return typeof initialState === "function"
      ? (initialState as () => S)()
      : initialState;
  }
  return valueLoadedFromLocalStorage;
}

type UseLocalStorageStateReturnValue<S> = [
  S,
  Dispatch<SetStateAction<S>>,
  () => void,
];
type BroadcastCustomEvent<S> = CustomEvent<{ newValue: S }>;
/**
 * useLocalStorageState hook
 * Tracks a value within localStorage and updates it
 *
 * @param key - Key of the localStorage object
 * @param initialState - Default initial value
 * @see https://rooks.vercel.app/docs/useLocalStorageState
 */
function useLocalStorageState<S>(
  key: LocalStorageKey,
  initialState?: S | (() => S),
): UseLocalStorageStateReturnValue<S> {
  const [value, setValue] = useState(() => initialize(key, initialState));
  const isUpdateFromCrossDocumentListener = useRef(false);
  const isUpdateFromWithinDocumentListener = useRef(false);
  const customEventTypeName = useMemo(() => {
    return `rooks-${key}-local-storage-update`;
  }, [key]);

  useEffect(() => {
    /**
     * We need to ensure there is no loop of
     * storage events fired. Hence we are using a ref
     * to keep track of whether setValue is from another
     * storage event
     */
    if (
      !isUpdateFromCrossDocumentListener.current ||
      !isUpdateFromWithinDocumentListener.current
    ) {
      saveValueToLocalStorage<S>(key, value as S);
    }
  }, [key, value]);

  const listenToCrossDocumentStorageEvents = useCallback(
    (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        try {
          isUpdateFromCrossDocumentListener.current = true;
          const newValue = JSON.parse(event.newValue ?? "null");
          if (value !== newValue) {
            setValue(newValue);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }
    },
    [key, value],
  );

  // check for changes across documents
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", listenToCrossDocumentStorageEvents);

      return () => {
        window.removeEventListener(
          "storage",
          listenToCrossDocumentStorageEvents,
        );
      };
    }
    // eslint-disable-next-line no-console
    console.warn("useLocalStorageState: window is undefined.");

    return () => ({});
  }, [listenToCrossDocumentStorageEvents]);

  const listenToCustomEventWithinDocument = useCallback(
    (event: BroadcastCustomEvent<S>) => {
      try {
        isUpdateFromWithinDocumentListener.current = true;
        const { newValue } = event.detail;
        if (value !== newValue) {
          setValue(newValue);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [value],
  );

  // check for changes within document
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener(
        customEventTypeName,
        listenToCustomEventWithinDocument as EventListener,
      );

      return () => {
        document.removeEventListener(
          customEventTypeName,
          listenToCustomEventWithinDocument as EventListener,
        );
      };
    }
    // eslint-disable-next-line no-console
    console.warn("[useLocalStorageState] document is undefined.");

    return () => ({});
  }, [customEventTypeName, listenToCustomEventWithinDocument]);

  const broadcastValueWithinDocument = useCallback(
    (newValue: S) => {
      if (typeof document !== "undefined") {
        const event: BroadcastCustomEvent<S> = new CustomEvent(
          customEventTypeName,
          { detail: { newValue } },
        );
        document.dispatchEvent(event);
      } else {
        // eslint-disable-next-line no-console
        console.warn("[useLocalStorageState] document is undefined.");
      }
    },
    [customEventTypeName],
  );

  const set = useCallback(
    (newValue: SetStateAction<S>) => {
      const resolvedNewValue =
        typeof newValue === "function"
          ? (newValue as (prevState: S) => S)(value as S)
          : newValue;
      isUpdateFromCrossDocumentListener.current = false;
      isUpdateFromWithinDocumentListener.current = false;
      setValue(resolvedNewValue);
      broadcastValueWithinDocument(resolvedNewValue);
    },
    [broadcastValueWithinDocument, value],
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return [value as S, set, remove];
}

export { useLocalStorageState };
