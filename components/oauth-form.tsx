"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { TESLA_AUTHORIZE_URL } from "@/lib/config"

export default function OAuthForm() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [clientId, setClientId] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!clientId || !clientSecret) {
            setError("Please fill in both Client ID and Client Secret.")
            return
        }

        try {
            // Create random value for state
            const state = Math.random().toString(36).substring(7)

            // Save the client ID and client secret to the session storage
            sessionStorage.setItem("clientId", clientId)
            sessionStorage.setItem("clientSecret", clientSecret)

            // build the OAuth URL
            const authorizeUrl = new URL(TESLA_AUTHORIZE_URL)
            authorizeUrl.searchParams.append("response_type", "code")
            authorizeUrl.searchParams.append("client_id", clientId)
            authorizeUrl.searchParams.append("redirect_uri", baseUrl + "/callback")
            authorizeUrl.searchParams.append("scope", "openid offline_access user_data vehicle_device_data vehicle_location")
            authorizeUrl.searchParams.append("state", state)

            // Redirect to the OAuth URL using window.location.href
            window.location.href = authorizeUrl.toString()
        } catch (err) {
            setError("An error occurred while submitting the form.")
        }
    }

    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle>Tesla App</CardTitle>
                <CardDescription>Date entered here is only stored locally in your browser.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="clientId">Client ID</Label>
                        <Input
                            id="clientId"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            placeholder="Enter your OAuth Client ID"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clientSecret">Client Secret</Label>
                        <Input
                            id="clientSecret"
                            type="password"
                            value={clientSecret}
                            onChange={(e) => setClientSecret(e.target.value)}
                            placeholder="Enter your OAuth Client Secret"
                            required
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Tesla Login into your App
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

