"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Cipher Corp</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-2 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="border-t md:hidden">
                    <div className="container mx-auto space-y-1 px-4 py-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    pathname === item.href
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
