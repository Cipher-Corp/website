import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TeamMemberDetailClient } from "./client";

// Force dynamic rendering - content can change anytime
export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function TeamMemberPage({ params }: Props) {
    const { id } = await params;

    const member = await prisma.teamMember.findUnique({
        where: { id },
    });

    if (!member) {
        notFound();
    }

    return <TeamMemberDetailClient member={member} />;
}
