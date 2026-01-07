import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fc from "fast-check";
import bcrypt from "bcryptjs";
import prisma from "./prisma";

/**
 * Feature: cipher-corp-website, Property 6: Authentication Validation
 * 
 * For any login attempt, authentication SHALL succeed if and only if
 * the email exists in the database AND the password matches the stored hash.
 * 
 * Validates: Requirements 4.2, 4.3
 */

// Helper function to validate credentials (mirrors auth.ts logic)
async function validateCredentials(
    email: string,
    password: string
): Promise<boolean> {
    const admin = await prisma.admin.findUnique({
        where: { email },
    });

    if (!admin) {
        return false;
    }

    return bcrypt.compare(password, admin.password);
}

describe("Property 6: Authentication Validation", () => {
    const testEmail = "test-auth@ciphercorp.com";
    const testPassword = "testPassword123";
    let hashedPassword: string;

    beforeAll(async () => {
        // Create a test admin for property testing
        hashedPassword = await bcrypt.hash(testPassword, 10);
        await prisma.admin.upsert({
            where: { email: testEmail },
            update: { password: hashedPassword },
            create: {
                email: testEmail,
                password: hashedPassword,
            },
        });
    });

    afterAll(async () => {
        // Clean up test admin
        await prisma.admin.deleteMany({
            where: { email: testEmail },
        });
        await prisma.$disconnect();
    });

    it("should authenticate successfully with valid email and correct password", async () => {
        const result = await validateCredentials(testEmail, testPassword);
        expect(result).toBe(true);
    });

    it("should fail authentication with valid email but wrong password", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1, maxLength: 50 }).filter(
                    (s) => s !== testPassword && s.trim().length > 0
                ),
                async (wrongPassword) => {
                    const result = await validateCredentials(testEmail, wrongPassword);
                    return result === false;
                }
            ),
            { numRuns: 20 }
        );
    }, 30000);

    it("should fail authentication with non-existent email", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.emailAddress().filter((e) => e !== testEmail),
                async (nonExistentEmail) => {
                    const result = await validateCredentials(nonExistentEmail, testPassword);
                    return result === false;
                }
            ),
            { numRuns: 100 }
        );
    });

    it("should fail authentication with both wrong email and password", async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.emailAddress().filter((e) => e !== testEmail),
                fc.string({ minLength: 1, maxLength: 50 }),
                async (wrongEmail, wrongPassword) => {
                    const result = await validateCredentials(wrongEmail, wrongPassword);
                    return result === false;
                }
            ),
            { numRuns: 100 }
        );
    });
});
