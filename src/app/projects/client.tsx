"use client";

import { AnimatedProjectCard } from "@/components/animated-cards";
import { BlurFade, FadeUp } from "@/components/motion";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string;
}

export function ProjectsPageClient({ projects }: { projects: Project[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <BlurFade>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Our Projects
                    </h1>
                </BlurFade>
                <FadeUp delay={0.1}>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore our work in machine learning and data science
                    </p>
                </FadeUp>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <AnimatedProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
