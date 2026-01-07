"use client";

import { BlurFade, FadeUp } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    email: string;
}

const socialLinks = [
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", isEmail: false },
    { key: "twitter", icon: Twitter, label: "X (Twitter)", isEmail: false },
    { key: "instagram", icon: Instagram, label: "Instagram", isEmail: false },
    { key: "email", icon: Mail, label: "Email", isEmail: true },
] as const;

export function TeamMemberDetailClient({ member }: { member: TeamMember }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <FadeUp>
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/about">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Team
                    </Link>
                </Button>
            </FadeUp>

            <div className="max-w-3xl mx-auto">
                {/* Profile Header */}
                <div className="text-center">
                    <BlurFade>
                        <motion.div
                            className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50 text-5xl font-bold text-primary-foreground"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {member.name.charAt(0)}
                        </motion.div>
                    </BlurFade>

                    <BlurFade delay={0.1}>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {member.name}
                        </h1>
                    </BlurFade>

                    <FadeUp delay={0.2}>
                        <p className="mt-2 text-xl text-primary font-medium">
                            {member.role}
                        </p>
                    </FadeUp>
                </div>

                {/* Social Links */}
                <FadeUp delay={0.3}>
                    <div className="mt-8 flex justify-center gap-4">
                        {socialLinks.map(({ key, icon: Icon, label, isEmail }) => {
                            const value = member[key as keyof TeamMember] as string;
                            if (!value) return null;

                            const href = isEmail ? `mailto:${value}` : value;

                            return (
                                <motion.div key={key} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={href}
                                        target={isEmail ? undefined : "_blank"}
                                        rel={isEmail ? undefined : "noopener noreferrer"}
                                        aria-label={label}
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </FadeUp>

                {/* Bio */}
                <FadeUp delay={0.4}>
                    <div className="mt-10 rounded-xl border bg-card p-8">
                        <h2 className="text-xl font-semibold mb-4">About</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {member.bio || "No bio available."}
                        </p>
                    </div>
                </FadeUp>

                {/* Contact CTA */}
                <FadeUp delay={0.5}>
                    <div className="mt-8 text-center">
                        {member.email && (
                            <Button asChild size="lg">
                                <Link href={`mailto:${member.email}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Get in Touch
                                </Link>
                            </Button>
                        )}
                    </div>
                </FadeUp>
            </div>
        </div>
    );
}
