"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Toast notification system for API errors and success messages
 * Requirements: 6.5
 */

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

const toastIcons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
};

const toastStyles: Record<ToastType, string> = {
    success: "border-green-500/50 bg-green-500/10",
    error: "border-destructive/50 bg-destructive/10",
    info: "border-blue-500/50 bg-blue-500/10",
    warning: "border-yellow-500/50 bg-yellow-500/10",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback(
        (message: string, type: ToastType = "info", duration: number = 5000) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast: Toast = { id, message, type, duration };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== id));
                }, duration);
            }
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

function ToastContainer({
    toasts,
    removeToast,
}: {
    toasts: Toast[];
    removeToast: (id: string) => void;
}) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border shadow-lg bg-background animate-in slide-in-from-right-full duration-300",
                        toastStyles[toast.type]
                    )}
                    role="alert"
                >
                    {toastIcons[toast.type]}
                    <p className="flex-1 text-sm">{toast.message}</p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Dismiss"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
