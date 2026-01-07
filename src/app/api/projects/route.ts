import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/projects - List all projects (public)
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: "asc" },
        });

        return NextResponse.json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}

// POST /api/projects - Create project (auth required)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, description, tags, imageUrl } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required" },
                { status: 400 }
            );
        }

        // Get the highest order value to add new project at the end
        const maxOrder = await prisma.project.aggregate({
            _max: { order: true },
        });
        const newOrder = (maxOrder._max.order ?? -1) + 1;

        const project = await prisma.project.create({
            data: {
                title,
                description,
                tags: tags || "",
                imageUrl: imageUrl || "",
                order: newOrder,
            },
        });

        return NextResponse.json({ project }, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}
