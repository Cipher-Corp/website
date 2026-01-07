import { prisma } from "@/lib/prisma";
import { ProjectsPageClient } from "./client";

// Force dynamic rendering - content can change anytime
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    });

    return <ProjectsPageClient projects={projects} />;
}
