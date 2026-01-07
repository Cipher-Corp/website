import { z } from "zod";

/**
 * Zod validation schemas for Cipher Corp website
 * Requirements: 6.1, 6.2
 */

// Project form data schema
export const projectFormSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title must be 200 characters or less")
        .trim(),
    description: z
        .string()
        .min(1, "Description is required")
        .max(2000, "Description must be 2000 characters or less")
        .trim(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

// Team member form data schema
export const teamMemberFormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be 100 characters or less")
        .trim(),
    role: z
        .string()
        .min(1, "Role is required")
        .max(100, "Role must be 100 characters or less")
        .trim(),
});

export type TeamMemberFormData = z.infer<typeof teamMemberFormSchema>;

// Login form data schema
export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .max(255, "Email must be 255 characters or less"),
    password: z
        .string()
        .min(1, "Password is required")
        .max(128, "Password must be 128 characters or less"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// Validation helper functions
export function validateProjectForm(data: unknown): {
    success: boolean;
    data?: ProjectFormData;
    errors?: z.ZodError;
} {
    const result = projectFormSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}

export function validateTeamMemberForm(data: unknown): {
    success: boolean;
    data?: TeamMemberFormData;
    errors?: z.ZodError;
} {
    const result = teamMemberFormSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}

export function validateLoginForm(data: unknown): {
    success: boolean;
    data?: LoginFormData;
    errors?: z.ZodError;
} {
    const result = loginFormSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}
