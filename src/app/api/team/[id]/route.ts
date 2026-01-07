import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/team/[id] - Get single team member (public)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const member = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!member) {
            return NextResponse.json(
                { error: "Team member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ member });
    } catch (error) {
        console.error("Error fetching team member:", error);
        return NextResponse.json(
            { error: "Failed to fetch team member" },
            { status: 500 }
        );
    }
}

// PUT /api/team/[id] - Update team member (auth required)
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
        const { name, role, bio, instagram, linkedin, twitter, email } = body;

        if (!name || !role) {
            return NextResponse.json(
                { error: "Name and role are required" },
                { status: 400 }
            );
        }

        // Check if team member exists
        const existingMember = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!existingMember) {
            return NextResponse.json(
                { error: "Team member not found" },
                { status: 404 }
            );
        }

        const member = await prisma.teamMember.update({
            where: { id },
            data: {
                name,
                role,
                bio: bio ?? existingMember.bio,
                instagram: instagram ?? existingMember.instagram,
                linkedin: linkedin ?? existingMember.linkedin,
                twitter: twitter ?? existingMember.twitter,
                email: email ?? existingMember.email,
            },
        });

        return NextResponse.json({ member });
    } catch (error) {
        console.error("Error updating team member:", error);
        return NextResponse.json(
            { error: "Failed to update team member" },
            { status: 500 }
        );
    }
}
