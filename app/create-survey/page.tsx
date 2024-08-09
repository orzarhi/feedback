import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UpsertSurvey } from './upsert-survey';
import { notFound } from 'next/navigation';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    return notFound();
  }

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    return notFound();
  }

  return <UpsertSurvey  />;
}
