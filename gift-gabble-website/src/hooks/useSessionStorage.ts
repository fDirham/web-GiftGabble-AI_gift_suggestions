import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
/**
 * NOTE:
 * - We stringify everything, including initial value, since we ran into bugs
 * without it
 *
 */
export default function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean, () => void] {
  const strInitVal = JSON.stringify(initialValue);
  const [_storedValue, _setStoredValue] = useState<string>(strInitVal);
  // We will use this flag to trigger the reading from sessionStorage
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  // Use an effect hook in order to prevent SSR inconsistencies and errors.
  // This will update the state with the value from the local storage after
  // the first initial value is applied.
  useEffect(() => {
    const fromLocal = () => {
      if (typeof window === "undefined") {
        return strInitVal;
      }
      try {
        const item = window.sessionStorage.getItem(key);
        return item ? item : strInitVal;
      } catch (error) {
        console.error(error);
        return strInitVal;
      }
    };

    // Set the value from sessionStorage
    _setStoredValue(fromLocal);
    // First load is done
    setFirstLoadDone(true);
  }, [strInitVal, key]);

  // Instead of replacing the setState function, react to changes.
  // Whenever the state value changes, save it in the local storage.
  useEffect(() => {
    // If it's the first load, don't store the value.
    // Otherwise, the initial value will overwrite the local storage.
    if (!firstLoadDone) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, _storedValue);
      }
    } catch (error) {
      console.error(error);
    }
  }, [_storedValue, firstLoadDone, key]);

  const setStoredValue = useCallback(
    (newVal: SetStateAction<T>) => {
      let changeTo: T = newVal as T;
      if (typeof newVal == "function") {
        newVal = newVal as (prevState: T) => T;
        changeTo = newVal(JSON.parse(_storedValue));
      }
      _setStoredValue(JSON.stringify(changeTo));
    },
    [_storedValue]
  );

  const storedValue = useMemo(() => {
    return JSON.parse(_storedValue);
  }, [_storedValue]);

  const clearValue = useCallback(() => {
    if (typeof window === "undefined") {
      return true;
    }
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  // Return the original useState functions
  return [storedValue, setStoredValue, firstLoadDone, clearValue];
}
