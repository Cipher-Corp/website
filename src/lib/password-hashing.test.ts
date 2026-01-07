import { describe, it, expect } from "vitest";
import fc from "fast-check";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

/**
 * Feature: cipher-corp-website, Property 9: Password Hashing
 * 
 * For any admin record in the database, the stored password SHALL NOT
 * equal the plain text password (must be hashed).
 * 
 * Validates: Requirements 6.3
 */

describe("Property 9: Password Hashing", () => {
    it("should store hashed passwords that differ from plain text", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 8, maxLength: 50 }).filter((s) => s.trim().length >= 8),
                async (plainPassword) => {
                    const hashedPassword = await bcrypt.hash(plainPassword, 10);

                    // Property: hashed password must NOT equal plain text
                    return hashedPassword !== plainPassword;
                }
            ),
            { numRuns: 20 }
        );
    }, 30000);

    it("should verify that existing admin passwords in database are hashed", async () => {
        const admins = await prisma.admin.findMany();

        for (const admin of admins) {
            // Hashed bcrypt passwords start with $2a$, $2b$, or $2y$
            expect(admin.password).toMatch(/^\$2[aby]\$/);
            // Hashed passwords are typically 60 characters
            expect(admin.password.length).toBe(60);
        }
    });

    it("should produce different hashes for the same password (salt)", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 8, maxLength: 50 }).filter((s) => s.trim().length >= 8),
                async (plainPassword) => {
                    const hash1 = await bcrypt.hash(plainPassword, 10);
                    const hash2 = await bcrypt.hash(plainPassword, 10);

                    // Property: same password should produce different hashes due to salt
                    return hash1 !== hash2;
                }
            ),
            { numRuns: 20 }
        );
    }, 30000);

    it("should verify hashed password with bcrypt.compare", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 8, maxLength: 50 }).filter((s) => s.trim().length >= 8),
                async (plainPassword) => {
                    const hashedPassword = await bcrypt.hash(plainPassword, 10);

                    // Property: bcrypt.compare should return true for correct password
                    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
                    return isValid === true;
                }
            ),
            { numRuns: 20 }
        );
    }, 30000);
});
