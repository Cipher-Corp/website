import { describe, it, afterAll } from "vitest";
import fc from "fast-check";
import prisma from "./prisma";

/**
 * Feature: cipher-corp-website, Property 7: Project CRUD Round-Trip
 * 
 * For any valid project data, creating a project and then fetching it by ID
 * SHALL return equivalent data. Updating a project and fetching it SHALL
 * return the updated data. Deleting a project and fetching it SHALL return
 * not found.
 * 
 * Validates: Requirements 5.1, 5.2, 5.3
 */

// Track created project IDs for cleanup
const createdProjectIds: string[] = [];

describe("Property 7: Project CRUD Round-Trip", () => {
    afterAll(async () => {
        // Clean up all test projects
        if (createdProjectIds.length > 0) {
            await prisma.project.deleteMany({
                where: { id: { in: createdProjectIds } },
            });
        }
        await prisma.$disconnect();
    });

    it("should create a project and fetch it with equivalent data (create round-trip)", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
                async (title, description) => {
                    // Create project
                    const created = await prisma.project.create({
                        data: { title, description },
                    });
                    createdProjectIds.push(created.id);

                    // Fetch project by ID
                    const fetched = await prisma.project.findUnique({
                        where: { id: created.id },
                    });

                    // Property: fetched data should match created data
                    return (
                        fetched !== null &&
                        fetched.id === created.id &&
                        fetched.title === title &&
                        fetched.description === description
                    );
                }
            ),
            { numRuns: 100 }
        );
    }, 60000);

    it("should update a project and fetch it with updated data (update round-trip)", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
                async (initialTitle, initialDesc, updatedTitle, updatedDesc) => {
                    // Create initial project
                    const created = await prisma.project.create({
                        data: { title: initialTitle, description: initialDesc },
                    });
                    createdProjectIds.push(created.id);

                    // Update project
                    await prisma.project.update({
                        where: { id: created.id },
                        data: { title: updatedTitle, description: updatedDesc },
                    });

                    // Fetch updated project
                    const fetched = await prisma.project.findUnique({
                        where: { id: created.id },
                    });

                    // Property: fetched data should match updated data
                    return (
                        fetched !== null &&
                        fetched.title === updatedTitle &&
                        fetched.description === updatedDesc
                    );
                }
            ),
            { numRuns: 100 }
        );
    }, 60000);

    it("should delete a project and return null when fetching (delete round-trip)", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
                fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
                async (title, description) => {
                    // Create project
                    const created = await prisma.project.create({
                        data: { title, description },
                    });
                    const projectId = created.id;

                    // Delete project
                    await prisma.project.delete({
                        where: { id: projectId },
                    });

                    // Fetch deleted project
                    const fetched = await prisma.project.findUnique({
                        where: { id: projectId },
                    });

                    // Property: fetched should be null after deletion
                    return fetched === null;
                }
            ),
            { numRuns: 100 }
        );
    }, 60000);
});
