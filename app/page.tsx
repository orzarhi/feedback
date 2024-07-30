import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardIcon,
  GiftIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 space-y-10 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Share Your Feed<span className="text-primary">back</span>, Shape
              the Future
            </h1>
            <p className="max-w-[700px] mx-auto text-lg md:text-xl">
              Your voice matters. Join our survey and help us improve our
              products and services to better serve your needs.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="container px-4 md:px-6 space-y-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <ClipboardIcon className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Purpose of the Survey</h3>
              <p className="text-muted-foreground">
                We&apos;re conducting this survey to better understand your
                needs and preferences, so we can improve our products and
                services to better serve you.
              </p>
            </div>
            <div className="space-y-4">
              <UsersIcon className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Who is it for?</h3>
              <p className="text-muted-foreground">
                This survey is designed for our valued customers like you. We
                want to hear from a diverse range of perspectives to ensure
                we&apos;re meeting the needs of our entire user base.
              </p>
            </div>
            <div className="space-y-4">
              <GiftIcon className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Benefits of Participating</h3>
              <p className="text-muted-foreground">
                By sharing your feedback, you&apos;ll help shape the future of
                our products and services. Plus, all participants will be
                entered into a drawing to win a $500 gift card!
              </p>
            </div>
          </div>
            <Link
              href="/api/auth/register"
              className={buttonVariants({
                className:"max-sm:w-full bg-primary-foreground relative bottom-4 text-primary hover:bg-primary-foreground/90",
              })}
            >
              Take the Survey <ArrowRight className="size-5 ml-2" />
            </Link>
        </div>
      </section>
    </div>
  );
}
