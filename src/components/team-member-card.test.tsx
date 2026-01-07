/**
 * Feature: cipher-corp-website, Property 2: Content Field Rendering (team members)
 * Validates: Requirements 1.2
 * 
 * For any team member record, the rendered card component SHALL contain
 * all required fields (name and role).
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import fc from "fast-check";
import { TeamMemberCard, TeamMemberCardProps } from "./team-member-card";

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Generator for valid team member data
const teamMemberArbitrary = fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
    role: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
});

describe("TeamMemberCard - Property 2: Content Field Rendering", () => {
    it("should render all required fields (name and role) for any valid team member", () => {
        fc.assert(
            fc.property(teamMemberArbitrary, (member: TeamMemberCardProps) => {
                cleanup(); // Ensure clean state before each iteration

                const { container } = render(
                    <TeamMemberCard id={member.id} name={member.name} role={member.role} />
                );

                // Verify name is rendered in the card title
                const titleElement = container.querySelector(".text-lg");
                expect(titleElement).not.toBeNull();
                expect(titleElement?.textContent).toBe(member.name);

                // Verify role is rendered in the card content
                const roleElement = container.querySelector(".text-muted-foreground");
                expect(roleElement).not.toBeNull();
                expect(roleElement?.textContent).toBe(member.role);
            }),
            { numRuns: 100 }
        );
    });
});
