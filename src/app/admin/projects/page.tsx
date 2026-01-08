"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/toast";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string;
    imageUrl: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

interface ProjectFormData {
    title: string;
    description: string;
    tags: string;
    imageUrl: string;
}

export default function AdminProjectsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { addToast } = useToast();
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingProject, setEditingProject] = React.useState<Project | null>(null);
    const [formData, setFormData] = React.useState<ProjectFormData>({
        title: "",
        description: "",
        tags: "",
        imageUrl: "",
    });
    const [submitting, setSubmitting] = React.useState(false);

    // Redirect if not authenticated
    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    // Fetch projects
    const fetchProjects = React.useCallback(async () => {
        try {
            const response = await fetch("/api/projects");
            if (!response.ok) throw new Error("Failed to fetch projects");
            const data = await response.json();
            setProjects(data.projects);
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred";
            setError(message);
            addToast(message, "error");
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    React.useEffect(() => {
        if (session) {
            fetchProjects();
        }
    }, [session, fetchProjects]);

    const openAddForm = () => {
        setEditingProject(null);
        setFormData({ title: "", description: "", tags: "", imageUrl: "" });
        setIsFormOpen(true);
    };

    const openEditForm = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            tags: project.tags,
            imageUrl: project.imageUrl,
        });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingProject(null);
        setFormData({ title: "", description: "", tags: "", imageUrl: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) return;

        setSubmitting(true);
        setError(null);

        try {
            if (editingProject) {
                const response = await fetch(`/api/projects/${editingProject.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        tags: formData.tags,
                        imageUrl: formData.imageUrl,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update project");
                }

                // Update local state with actual response from server
                const data = await response.json();
                setProjects((prev) =>
                    prev.map((p) =>
                        p.id === editingProject.id ? data.project : p
                    )
                );
                addToast("Project updated successfully", "success");
            } else {
                const response = await fetch("/api/projects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        tags: formData.tags,
                        imageUrl: formData.imageUrl,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create project");
                }

                // Add new project from server response
                const data = await response.json();
                setProjects((prev) => [...prev, data.project]);
                addToast("Project created successfully", "success");
            }

            closeForm();
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred";
            setError(message);
            addToast(message, "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (project: Project) => {
        if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

        // Optimistic delete
        setProjects((prev) => prev.filter((p) => p.id !== project.id));

        try {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                // Revert on error
                await fetchProjects();
                throw new Error("Failed to delete project");
            }
            addToast("Project deleted successfully", "success");
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred";
            setError(message);
            addToast(message, "error");
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Projects</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your projects
                    </p>
                </div>
                <Button onClick={openAddForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                </Button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md">
                    {error}
                </div>
            )}

            {/* Project Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>
                                        {editingProject ? "Edit Project" : "Add Project"}
                                    </CardTitle>
                                    <CardDescription>
                                        {editingProject
                                            ? "Update the project details"
                                            : "Create a new project"}
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" onClick={closeForm}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                            }))
                                        }
                                        placeholder="Project title"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        placeholder="Project description"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                tags: e.target.value,
                                            }))
                                        }
                                        placeholder="Comma-separated tags (e.g., React, TypeScript, AI)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl">Preview Image URL</Label>
                                    <Input
                                        id="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                imageUrl: e.target.value,
                                            }))
                                        }
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closeForm}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={submitting}>
                                        {submitting
                                            ? "Saving..."
                                            : editingProject
                                                ? "Update"
                                                : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Projects List */}
            {projects.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">
                            No projects yet. Create your first project!
                        </p>
                        <Button onClick={openAddForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Project
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <Card key={project.id}>
                            <CardContent className="py-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4 flex-1 min-w-0 pr-4">
                                        {project.imageUrl && (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                                {project.description}
                                            </p>
                                            {project.tags && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {project.tags.split(",").map((tag, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                                                        >
                                                            {tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => openEditForm(project)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleDelete(project)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
