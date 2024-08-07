'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface SaveToLocalStorageProps<T> {
  storageKey: string;
  value: T;
}

export const SaveToLocalStorage = <T,>({
  storageKey,
  value,
}: SaveToLocalStorageProps<T>) => {
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

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Please wait...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
};
