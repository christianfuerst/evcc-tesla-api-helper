import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Placeholder
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span className="text-sm text-center sm:text-left">
          Created by{" "}
          <a
            className="font-semibold text-foreground hover:underline"
            href="https://twitter.com/ijjk"
            target="_blank"
            rel="noopener noreferrer"
          >
            @christianfuerst
          </a>
        </span>
      </footer>
    </div>
  );
}
