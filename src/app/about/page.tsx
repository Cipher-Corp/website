import { prisma } from "@/lib/prisma";
import { AboutPageClient } from "./client";

export default async function AboutPage() {
    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { order: "asc" },
    });

    return <AboutPageClient teamMembers={teamMembers} />;
}
