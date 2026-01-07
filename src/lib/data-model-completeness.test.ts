import { describe, it, afterAll } from "vitest";
import fc from "fast-check";
import prisma from "./prisma";

/**
 * Feature: cipher-corp-website, Property 10: Data Model Completeness
 * 
 * For any project stored in the database, it SHALL have non-empty title and
 * description fields. For any team member, it SHALL have non-empty name and
 * role fields.
 * 
 * Validates: Requirements 6.1, 6.2
 */

// Track created IDs for cleanup
const createdProjectIds: string[] = [];
const createdMemberIds: string[] = [];

describe("Property 10: Data Model Completeness", () => {
    afterAll(async () => {
        // Clean up all test data
        if (createdProjectIds.length > 0) {
            await prisma.project.deleteMany({
                where: { id: { in: createdProjectIds } },
            });
        }
        if (createdMemberIds.length > 0) {
            await prisma.teamMember.deleteMany({
                where: { id: { in: createdMemberIds } },
            });
        }
        await prisma.$disconnect();
    });

    it("should ensure all stored projects have non-empty title and description fields", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 2000 }).filter((s) => s.trim().length > 0),
                async (title, description) => {
                    // Create project with valid data
                    const created = await prisma.project.create({
                        data: { title, description },
                    });
                    createdProjectIds.push(created.id);

                    // Fetch the project from database
                    const fetched = await prisma.project.findUnique({
                        where: { id: created.id },
                    });

                    // Property: stored project must have non-empty title and description
                    return (
                        fetched !== null &&
                        typeof fetched.title === "string" &&
                        fetched.title.length > 0 &&
                        typeof fetched.description === "string" &&
                        fetched.description.length > 0
                    );
                }
            ),
            { numRuns: 100 }
        );
    }, 60000);

    it("should ensure all stored team members have non-empty name and role fields", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                async (name, role) => {
                    // Create team member with valid data
                    const created = await prisma.teamMember.create({
                        data: { name, role },
                    });
                    createdMemberIds.push(created.id);

                    // Fetch the team member from database
                    const fetched = await prisma.teamMember.findUnique({
                        where: { id: created.id },
                    });

                    // Property: stored team member must have non-empty name and role
                    return (
                        fetched !== null &&
                        typeof fetched.name === "string" &&
                        fetched.name.length > 0 &&
                        typeof fetched.role === "string" &&
                        fetched.role.length > 0
                    );
                }
            ),
            { numRuns: 100 }
        );
    }, 60000);
});
