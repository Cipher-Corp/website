import { prisma } from "@/lib/prisma";
import { AboutPageClient } from "./client";

// Force dynamic rendering - content can change anytime
export const dynamic = "force-dynamic";

export default async function AboutPage() {
    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { order: "asc" },
    });

    return <AboutPageClient teamMembers={teamMembers} />;
}
