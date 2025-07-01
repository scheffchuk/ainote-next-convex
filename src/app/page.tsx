import Footer from "@/components/footer";
import { LavaLamp } from "@/components/lava-lamp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <LavaLamp />
      <main className="space-y-6 text-center tracking-tight text-white/80 mix-blend-exclusion">
        {/* Title */}
        <h1 className="text-6xl font-bold md:text-8xl">Amnesiac Memos</h1>
        {/* Description */}
        <p className="text-start text-lg/relaxed md:text-center">
          Learning how to build an AI-powered note-taking app using Next.js,
          Convex, and Vercel AI SDK.
        </p>
        {/* CTA button */}
        <Button className="px-8 py-4 text-lg whitespace-nowrap text-white/80">
          <Link href="/sign-in">Get Started</Link>
        </Button>
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
