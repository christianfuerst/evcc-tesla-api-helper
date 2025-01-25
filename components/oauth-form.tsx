"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function OAuthForm() {
    const [clientId, setClientId] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        if (!clientId || !clientSecret) {
            setError("Please fill in both Client ID and Client Secret.")
            return
        }

        // Here you would typically send the data to your server
        // For this example, we'll just simulate a successful submission
        try {
            // Simulating an API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Submitted:", { clientId, clientSecret })
            setSuccess(true)
            setClientId("")
            setClientSecret("")
        } catch (err) {
            setError("An error occurred while submitting the form.")
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>OAuth Credentials</CardTitle>
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
                    {success && (
                        <Alert className="bg-green-100 text-green-800 border-green-300">
                            <AlertDescription>Credentials submitted successfully!</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

