import React from 'react';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { ModeToggle } from './ModeToggle';

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/90 dark:bg-black dark:border-b-zinc-600 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-600">
          <Link href="/" className="flex z-40 font-semibold">
            feed<span className="text-orange-400">back</span>
            <Image src="/logo.svg" alt="logo" width={25} height={25} />
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <a
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Sign out
                </a>

                {isAdmin ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        size: 'sm',
                        variant: 'ghost',
                      })}
                    >
                      Dashboard ✨
                    </Link>
                    <Link
                      href="/create-survey"
                      className={buttonVariants({
                        size: 'sm',
                        className:
                          'hidden sm:flex items-center gap-1 bg-primary hover:bg-primary/90',
                      })}
                    >
                      Create survey
                      <ArrowRight className="size-5 ml-1.5" />
                    </Link>
                    <div className="h-8 w-px bg-muted-foreground sm:block" />
                    <ModeToggle />
                  </>
                ) : null}
              </>
            ) : (
              <>
                <a
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Sign up
                </a>

                <a
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Login
                </a>

                <ModeToggle />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
