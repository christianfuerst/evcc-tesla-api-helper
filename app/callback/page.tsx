"use client"

import { useSearchParams, redirect } from 'next/navigation';

export default function Callback() {
    const searchParams = useSearchParams();

    // Get the code from the URL query parameters
    const code = searchParams.get('code');

    if (code) {
        // Save the code to the session storage
        sessionStorage.setItem('code', code);
    }

    // Redirect to the home page
    redirect('/');
}