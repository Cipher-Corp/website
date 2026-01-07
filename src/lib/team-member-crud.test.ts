import { describe, it, afterAll } from "vitest";
import fc from "fast-check";
import prisma from "./prisma";

/**
 * Feature: cipher-corp-website, Property 8: Team Member Update Round-Trip
 * 
 * For any valid team member update, saving changes and then fetching the
 * team member SHALL return the updated values.
 * 
 * Validates: Requirements 5.4
 */

// Track created team member IDs for cleanup
const createdMemberIds: string[] = [];

describe("Property 8: Team Member Update Round-Trip", () => {
    afterAll(async () => {
        // Clean up all test team members
        if (createdMemberIds.length > 0) {
            await prisma.teamMember.deleteMany({
                where: { id: { in: createdMemberIds } },
            });
        }
        await prisma.$disconnect();
    });

    it("should update a team member and fetch it with updated data (update round-trip)", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                async (initialName, initialRole, updatedName, updatedRole) => {
                    // Create initial team member
                    const created = await prisma.teamMember.create({
                        data: { name: initialName, role: initialRole },
                    });
                    createdMemberIds.push(created.id);

                    // Update team member
                    await prisma.teamMember.update({
                        where: { id: created.id },
                        data: { name: updatedName, role: updatedRole },
                    });

                    // Fetch updated team member
                    const fetched = await prisma.teamMember.findUnique({
                        where: { id: created.id },
                    });

                    // Property: fetched data should match updated data
                    return (
                        fetched !== null &&
                        fetched.name === updatedName &&
                        fetched.role === updatedRole
                    );
                }
            ),
            { numRuns: 100 }
        );
    }, 60000);
});
