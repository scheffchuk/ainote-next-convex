import { LavaLamp } from "@/components/lava-lamp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

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
          <Link href="/notes">Get Started</Link>
        </Button>
        {/* Footer */}
        <footer className="mt-auto pt-16 flex flex-row items-center justify-center gap-2 px-4 text-center ">
          <small className="block text-base">
            © {new Date().getFullYear()} Scheff
          </small>
          <a
            href="https://github.com/scheffchuk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
        </footer>
      </main>
    </div>
  );
}
