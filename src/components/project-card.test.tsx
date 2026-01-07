/**
 * Feature: cipher-corp-website, Property 2: Content Field Rendering (projects)
 * Validates: Requirements 2.2
 * 
 * For any project record, the rendered card component SHALL contain
 * all required fields (title and description).
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import fc from "fast-check";
import { ProjectCard, ProjectCardProps } from "./project-card";

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Generator for valid project data
const projectArbitrary = fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
    description: fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
});

describe("ProjectCard - Property 2: Content Field Rendering", () => {
    it("should render all required fields (title and description) for any valid project", () => {
        fc.assert(
            fc.property(projectArbitrary, (project: ProjectCardProps) => {
                cleanup(); // Ensure clean state before each iteration

                const { container } = render(
                    <ProjectCard id={project.id} title={project.title} description={project.description} />
                );

                // Verify title is rendered in the card title
                const titleElement = container.querySelector(".text-lg");
                expect(titleElement).not.toBeNull();
                expect(titleElement?.textContent).toBe(project.title);

                // Verify description is rendered in the card content
                const descriptionElement = container.querySelector(".text-muted-foreground");
                expect(descriptionElement).not.toBeNull();
                expect(descriptionElement?.textContent).toBe(project.description);
            }),
            { numRuns: 100 }
        );
    });
});
