import { CopyLink } from '@/components/CopyLink';
import { buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    return notFound();
  }

  const surveys = await db.survey.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  if (!surveys || !surveys.length) {
    return notFound();
  }

  return (
    <Table className="max-w-4xl mx-auto px-2 py-8 sm:px-6 lg:px-8 mt-10">
      <TableCaption>A list of your recent surveys.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Questions</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {surveys.map((survey) => (
          <TableRow key={survey.id}>
            <TableCell className="font-medium overflow-hidden truncate w-2">
              {survey.title}
            </TableCell>
            <TableCell>{format(survey.createdAt, 'dd/MM/yyyy')}</TableCell>

            <TableCell>{survey._count.questions}</TableCell>
            <TableCell className="text-right">
              <CopyLink link={`${process.env.NEXT_PUBLIC_BASE_URL}/survey/${survey.id}`} />
              <Link
                href={`/survey/${survey.id}`}
                className={buttonVariants({
                  variant: 'link',
                  size: 'icon',
                })}
              >
                <Eye className="size-5" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total surveys</TableCell>
          <TableCell className="text-right">{surveys?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
