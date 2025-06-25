import { LavaLamp } from "@/components/fluid-blob";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <LavaLamp />
      <main className="max-w-screen text-center space-y-8">
        {/* Header */}
        <h1 className="text-4xl/relaxed font-bold tracking-tight mix-blend-exclusion text-white whitespace-nowrap">
          Building an AI-powered Note Taking App with Next.js and vercel AI SDK
        </h1>
        {/* LOGO */}
        {/* Title */}
        {/* Description */}
        {/* CTA button */}
        {/* Built with */}
        {/* Footer */}
      </main>
    </div>
  );
}
