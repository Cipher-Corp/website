"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/ciphercorp",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/company/ciphercorp",
        icon: Linkedin,
    },
    {
        name: "Email",
        href: "mailto:contact@ciphercorp.com",
        icon: Mail,
    },
    {
        name: "X",
        href: "https://x.com/ciphercorp",
        icon: Twitter,
    },
];

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    {/* Logo and Company Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <motion.div
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            C
                        </motion.div>
                        <div>
                            <h3 className="font-semibold text-lg">Cipher Corp</h3>
                            <p className="text-sm text-muted-foreground">
                                Machine Learning & Data Science
                            </p>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        {socialLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                >
                                    <motion.div
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors"
                                        whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <link.icon className="h-5 w-5" />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground"
                >
                    © {new Date().getFullYear()} Cipher Corp. All rights reserved.
                </motion.div>
            </div>
        </footer>
    );
}
