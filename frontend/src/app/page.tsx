import YouTubeUrlForm from "@/components/ui/YouTubeUrlForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      {/* Radial background effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[120vw] h-[120vw] bg-white rounded-full shadow-2xl opacity-60 blur-3xl" />
      </div>
      <section className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4 leading-tight">
          Get a YouTube Transcript Instantly
        </h1>
        <p className="text-lg text-center text-gray-500 mb-10 max-w-xl">
          Paste a YouTube video URL below to extract its transcript.
        </p>
        <YouTubeUrlForm />
      </section>
    </main>
  );
}
