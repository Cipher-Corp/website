"use client";

import { BlurFade, FadeUp } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    tags: string;
    createdAt: Date;
}

export function ProjectDetailClient({ project }: { project: Project }) {
    const tags = project.tags ? project.tags.split(",").map((t) => t.trim()) : [];

    return (
        <div className="container mx-auto px-4 py-8">
            <FadeUp>
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
            </FadeUp>

            <div className="max-w-4xl mx-auto">
                {/* Project Header */}
                <BlurFade>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        {project.title}
                    </h1>
                </BlurFade>

                <FadeUp delay={0.1}>
                    <p className="mt-4 text-xl text-muted-foreground">
                        {project.description}
                    </p>
                </FadeUp>

                {/* Meta info */}
                <FadeUp delay={0.2}>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(project.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                        {tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </FadeUp>

                {/* Project Image Placeholder */}
                <FadeUp delay={0.3}>
                    <motion.div
                        className="mt-8 aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex h-full items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                                    <span className="text-4xl font-bold text-primary">
                                        {project.title.charAt(0)}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">Project Preview</p>
                            </div>
                        </div>
                    </motion.div>
                </FadeUp>

                {/* Project Content */}
                <FadeUp delay={0.4}>
                    <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
                        {project.content.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </FadeUp>

                {/* CTA */}
                <FadeUp delay={0.5}>
                    <div className="mt-12 rounded-xl border bg-muted/50 p-8 text-center">
                        <h3 className="text-xl font-semibold mb-2">
                            Interested in this project?
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Get in touch with our team to learn more about how we can help.
                        </p>
                        <Button asChild>
                            <Link href="/about">Contact Our Team</Link>
                        </Button>
                    </div>
                </FadeUp>
            </div>
        </div>
    );
}
