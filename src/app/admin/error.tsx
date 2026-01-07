"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, LayoutDashboard } from "lucide-react";
import Link from "next/link";

/**
 * Admin-specific error page
 * Requirements: 6.5
 */
export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Admin panel error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <div className="flex flex-col items-center text-center max-w-md">
                <AlertCircle className="h-16 w-16 text-destructive mb-6" />
                <h2 className="text-xl font-semibold mb-4">Admin Panel Error</h2>
                <p className="text-muted-foreground mb-8">
                    An error occurred while loading the admin panel. Please try again.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={reset} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                    <Button asChild>
                        <Link href="/admin/dashboard">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
