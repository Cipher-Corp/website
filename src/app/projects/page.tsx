import { prisma } from "@/lib/prisma";
import { ProjectsPageClient } from "./client";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    });

    return <ProjectsPageClient projects={projects} />;
}
