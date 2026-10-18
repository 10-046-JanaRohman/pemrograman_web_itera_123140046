import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  // Membaca data sekali saat hook pertama kali digunakan.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    // Menyinkronkan state React ke penyimpanan browser setiap kali data berubah.
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      return undefined;
    }
    return undefined;
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
