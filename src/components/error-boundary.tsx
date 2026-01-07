"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary component for catching and handling client-side errors
 * Requirements: 6.5
 */
export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                    <div className="flex flex-col items-center text-center max-w-md">
                        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                        <p className="text-muted-foreground mb-6">
                            An unexpected error occurred. Please try again.
                        </p>
                        <Button onClick={this.handleReset} variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
