"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, FolderKanban, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface AdminNavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const adminNavItems: AdminNavItem[] = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
        label: "Projects",
        href: "/admin/projects",
        icon: <FolderKanban className="h-4 w-4" />,
    },
    {
        label: "Team",
        href: "/admin/team",
        icon: <Users className="h-4 w-4" />,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    // Show loading state while checking session
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    // If on login page (/admin), don't show sidebar
    if (pathname === "/admin") {
        return <>{children}</>;
    }

    // Redirect to login if not authenticated
    if (!session) {
        router.push("/admin");
        return null;
    }

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/admin" });
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card hidden md:block">
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b">
                        <Link href="/admin/dashboard" className="flex items-center space-x-2">
                            <span className="text-lg font-bold">Admin Panel</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {adminNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t">
                        <div className="mb-3 px-3 text-sm text-muted-foreground truncate">
                            {session.user?.email}
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b">
                <div className="flex items-center justify-between p-4">
                    <span className="font-bold">Admin Panel</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
                <nav className="flex overflow-x-auto border-t">
                    {adminNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                                pathname === item.href
                                    ? "border-b-2 border-primary text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:p-0 pt-28 md:pt-0">
                {children}
            </main>
        </div>
    );
}
