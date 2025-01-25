"use client"

import { Suspense } from 'react';
import { useSearchParams, redirect } from 'next/navigation';

function RedirectToHome() {
    const searchParams = useSearchParams();

    // Get the code from the URL query parameters
    const code = searchParams.get('code');

    if (code) {
        // Save the code to the session storage
        sessionStorage.setItem('code', code);
    }

    // Redirect to the home page
    redirect('/');

    return null
}

export default function Callback() {
    <Suspense fallback={<div>Loading...</div>}>
        <RedirectToHome />
    </Suspense>
}