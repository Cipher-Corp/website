import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./client";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient project={project} />;
}

export async function generateStaticParams() {
    const projects = await prisma.project.findMany({
        select: { id: true },
    });

    return projects.map((project) => ({
        id: project.id,
    }));
}
