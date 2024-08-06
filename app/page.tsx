import { buttonVariants } from '@/components/ui/button';
import { ClipboardIcon, ShareIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 space-y-10 text-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Create and Share Your Own Surveys<span className="text-primary"> Easily with Feedback</span>
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl">
            Empower your voice and connect with others. Create personalized surveys and share them with friends and colleagues to gather valuable feedback.
          </p>
        </div>
      </div>
    </section>
    <section className="w-full">
      <div className="container px-4 md:px-6 space-y-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <ClipboardIcon className="size-12 text-primary" />
            <h3 className="text-2xl font-bold">Easy Survey Creation</h3>
            <p className="text-muted-foreground">
              Quickly create surveys tailored to your needs with our user-friendly tools. Customize questions and design to fit any purpose.
            </p>
          </div>
          <div className="space-y-4">
            <UsersIcon className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-bold">Share with Anyone</h3>
            <p className="text-muted-foreground">
              Share your surveys via link or email to collect responses from friends, family, and colleagues. Reach a wide audience with ease.
            </p>
          </div>
          <div className="space-y-4">
            <ShareIcon className="w-12 h-12 text-primary" />
            <h3 className="text-2xl font-bold">Gather Insights and Feedback</h3>
            <p className="text-muted-foreground">
              Analyze responses to gain valuable insights and make informed decisions. Use feedback to improve or validate your ideas.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center">
            Ready to Create Your Survey?
          </h2>
          <p className="max-w-[700px] mx-auto text-lg text-center">
            Start crafting your survey today and get the feedback you need to succeed. It’s easy to set up and share with just a few clicks.
          </p>
          <div className="flex justify-center">
            <Link href='/create-survey' className={buttonVariants()}>Create a Survey</Link>
          </div>
          <br />
        </div>
      </div>
    </section>
  </div>
  );
}
