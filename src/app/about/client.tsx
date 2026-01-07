"use client";

import { AnimatedTeamMemberCard } from "@/components/animated-cards";
import { BlurFade, FadeUp } from "@/components/motion";

interface TeamMember {
    id: string;
    name: string;
    role: string;
}

export function AboutPageClient({ teamMembers }: { teamMembers: TeamMember[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <BlurFade>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Our Team
                    </h1>
                </BlurFade>
                <FadeUp delay={0.1}>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Meet the talented people behind Cipher Corp
                    </p>
                </FadeUp>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                    <AnimatedTeamMemberCard
                        key={member.id}
                        id={member.id}
                        name={member.name}
                        role={member.role}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}
