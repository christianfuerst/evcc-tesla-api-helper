"use client"

import OAuthForm from "@/components/oauth-form";
import TokenCard from '@/components/token-card';

export default function Home() {
  // Try to retrieve the code from the session storage
  let code = null;
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) code = sessionStorage.getItem('code');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          evcc Tesla API Helper
        </h4>
        <p className="leading-7 [&:not(:first-child)]:mt-2 mb-4">
          Create Tesla API tokens with your free tier Tesla Developer account.
        </p>
        {code ? <TokenCard code={code} /> : <OAuthForm />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <span className="text-sm text-center sm:text-left">
          Created by{" "}
          <a
            className="font-semibold text-foreground hover:underline"
            href="https://github.com/christianfuerst"
            target="_blank"
          >
            @christianfuerst
          </a>
        </span>
      </footer>
    </div>
  );
}
