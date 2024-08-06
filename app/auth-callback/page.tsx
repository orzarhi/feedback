'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAuthStatus } from './actions';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [surveyId, setSurveyId] = useState<string | null>(null);

  useEffect(() => {
    const survey = localStorage.getItem('surveyId');

    if (survey) setSurveyId(survey);
  }, []);

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (surveyId) {
      localStorage.removeItem('surveyId');
      router.push(`/survey?id=${surveyId}`);
    } else {
      router.push('/');
    }
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically</p>
      </div>
    </div>
  );
}
