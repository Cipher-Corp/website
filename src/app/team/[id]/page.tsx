import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TeamMemberDetailClient } from "./client";

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

export async function generateStaticParams() {
    const members = await prisma.teamMember.findMany({
        select: { id: true },
    });

    return members.map((member) => ({
        id: member.id,
    }));
}
