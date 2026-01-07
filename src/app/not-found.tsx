import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

/**
 * Custom 404 Not Found page
 * Requirements: 6.5
 */
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <div className="flex flex-col items-center text-center max-w-md">
                <FileQuestion className="h-16 w-16 text-muted-foreground mb-6" />
                <h1 className="text-4xl font-bold mb-2">404</h1>
                <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Button asChild>
                    <Link href="/">
                        <Home className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
