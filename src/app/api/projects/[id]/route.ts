import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/projects/[id] - Get single project (public)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json(
            { error: "Failed to fetch project" },
            { status: 500 }
        );
    }
}

// PUT /api/projects/[id] - Update project (auth required)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const { title, description, tags, imageUrl } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: "Title and description are required" },
                { status: 400 }
            );
        }

        // Check if project exists
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                tags: tags ?? existingProject.tags,
                imageUrl: imageUrl ?? existingProject.imageUrl,
            },
        });

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json(
            { error: "Failed to update project" },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id] - Delete project (auth required)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Check if project exists
        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        await prisma.project.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json(
            { error: "Failed to delete project" },
            { status: 500 }
        );
    }
}
