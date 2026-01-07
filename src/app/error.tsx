"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

/**
 * Custom Error page (500 and other runtime errors)
 * Requirements: 6.5
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to console (could be sent to error reporting service)
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <div className="flex flex-col items-center text-center max-w-md">
                <AlertCircle className="h-16 w-16 text-destructive mb-6" />
                <h1 className="text-4xl font-bold mb-2">500</h1>
                <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
                <p className="text-muted-foreground mb-8">
                    An unexpected error occurred. Our team has been notified.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={reset} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    <Button asChild>
                        <Link href="/">
                            <Home className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
