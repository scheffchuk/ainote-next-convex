import Footer from "@/components/footer";
import { LavaLamp } from "@/components/lava-lamp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <LavaLamp />
      <main className="text-center space-y-6 text-white/80 tracking-tight mix-blend-exclusion">
        {/* Header */}
        <h1 className="text-6xl md:text-8xl font-bold ">Amnesiac Memos</h1>
        {/* Description */}
        <p className="text-lg/relaxed text-start md:text-center">
          Learning how to build an AI-powered note-taking app using Next.js,
          Convex, and Vercel AI SDK.
        </p>
        {/* CTA button */}
        <Button className=" whitespace-nowrap text-lg px-8 py-4 text-white/80">
          <Link href="/sign-in">Get Started</Link>
        </Button>
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
