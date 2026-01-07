import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/team - List all team members (public)
export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: { order: "asc" },
        });

        return NextResponse.json({ members });
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json(
            { error: "Failed to fetch team members" },
            { status: 500 }
        );
    }
}
