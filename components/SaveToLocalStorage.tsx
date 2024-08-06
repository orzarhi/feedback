'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SaveToLocalStorageProps<T> {
  storageKey: string;
  value: T;
}

export const SaveToLocalStorage = <T,>({ storageKey, value }: SaveToLocalStorageProps<T>) => {
    const router = useRouter();

    useEffect(() => {
    try {
      const isPrimitive = (val: T): boolean => val !== Object(val);

      const serializedValue = isPrimitive(value) ? String(value) : JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
      router.push('/api/auth/login');

    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }, [storageKey, value, router]);

  return null;
};
