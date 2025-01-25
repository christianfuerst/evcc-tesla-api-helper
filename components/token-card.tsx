"use client"

import { useState } from "react"
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { TESLA_TOKEN_URL, TESLA_AUDIENCE_URL } from '@/lib/config';
import { LongStringDisplay } from '@/components/long-string-display';
import { Button } from "./ui/button";


interface TokenCardProps {
    code: string
}

export default function TokenCard({ code }: TokenCardProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [error, setError] = useState("")

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const generateTokens = async () => {
        setButtonDisabled(true);

        // Try to retrieve the client ID and client secret from the session storage
        const clientId = sessionStorage.getItem('clientId');
        const clientSecret = sessionStorage.getItem('clientSecret');

        try {
            const response = await axios.post(TESLA_TOKEN_URL, {
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: baseUrl + '/callback',
                audience: TESLA_AUDIENCE_URL,
            });

            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
            setClientId(clientId);
        } catch (error) {
            setButtonDisabled(false);
            setError("An error occurred while generating the tokens.")
            console.error(error);
        }
    };

    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle>Tokens</CardTitle>
                <CardDescription>Use this tokens in order to add you Tesla to evcc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button className="w-full" variant="outline" onClick={generateTokens} disabled={buttonDisabled}>
                    Generate Token
                </Button>
                <div className="w-full max-w-md">
                    <LongStringDisplay value={clientId || ''} label='Client ID' />
                </div>
                <div className="w-full max-w-md">
                    <LongStringDisplay value={accessToken || ''} label='Access Token' />
                </div>
                <div className="w-full max-w-md">
                    <LongStringDisplay value={refreshToken || ''} label='Refresh Token' />
                </div>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
