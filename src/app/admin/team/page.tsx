"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Pencil, X } from "lucide-react";
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

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    email: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

interface TeamMemberFormData {
    name: string;
    role: string;
    bio: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    email: string;
}

export default function AdminTeamPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { addToast } = useToast();
    const [members, setMembers] = React.useState<TeamMember[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingMember, setEditingMember] = React.useState<TeamMember | null>(null);
    const [formData, setFormData] = React.useState<TeamMemberFormData>({
        name: "",
        role: "",
        bio: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        email: "",
    });
    const [submitting, setSubmitting] = React.useState(false);

    // Redirect if not authenticated
    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    // Fetch team members
    const fetchMembers = React.useCallback(async () => {
        try {
            const response = await fetch("/api/team");
            if (!response.ok) throw new Error("Failed to fetch team members");
            const data = await response.json();
            setMembers(data.members);
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
            fetchMembers();
        }
    }, [session, fetchMembers]);

    const openEditForm = (member: TeamMember) => {
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio,
            instagram: member.instagram,
            linkedin: member.linkedin,
            twitter: member.twitter,
            email: member.email,
        });
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingMember(null);
        setFormData({ name: "", role: "", bio: "", instagram: "", linkedin: "", twitter: "", email: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.role.trim() || !editingMember) return;

        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/team/${editingMember.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update team member");
            }

            // Update local state with the actual response from server
            const data = await response.json();
            setMembers((prev) =>
                prev.map((m) =>
                    m.id === editingMember.id ? data.member : m
                )
            );

            addToast("Team member updated successfully", "success");
            closeForm();
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred";
            setError(message);
            addToast(message, "error");
        } finally {
            setSubmitting(false);
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
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Team Members</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your team information
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md">
                    {error}
                </div>
            )}

            {/* Edit Form Modal */}
            {isFormOpen && editingMember && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Edit Team Member</CardTitle>
                                    <CardDescription>
                                        Update team member details
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
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="Team member name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                role: e.target.value,
                                            }))
                                        }
                                        placeholder="Team member role"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                bio: e.target.value,
                                            }))
                                        }
                                        placeholder="Short bio about the team member"
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <Input
                                        id="linkedin"
                                        value={formData.linkedin}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                linkedin: e.target.value,
                                            }))
                                        }
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter">Twitter</Label>
                                    <Input
                                        id="twitter"
                                        value={formData.twitter}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                twitter: e.target.value,
                                            }))
                                        }
                                        placeholder="https://twitter.com/username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <Input
                                        id="instagram"
                                        value={formData.instagram}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                instagram: e.target.value,
                                            }))
                                        }
                                        placeholder="https://instagram.com/username"
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
                                        {submitting ? "Saving..." : "Update"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Team Members List */}
            {members.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                            No team members found.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {members.map((member) => (
                        <Card key={member.id}>
                            <CardContent className="py-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h3 className="font-semibold text-lg truncate">
                                            {member.name}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            {member.role}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => openEditForm(member)}
                                        >
                                            <Pencil className="h-4 w-4" />
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
