"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setValue(JSON.parse(item));
    }
  }, [key]);

  const setStorageValue = (value: T) => {
    setStorageValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setStorageValue];
}
