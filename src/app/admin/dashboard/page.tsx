import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin");
    }

    // Fetch counts for dashboard
    const [projectCount, teamMemberCount] = await Promise.all([
        prisma.project.count(),
        prisma.teamMember.count(),
    ]);

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Welcome back, {session.user?.email}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{projectCount}</p>
                        <p className="text-muted-foreground text-sm mt-1">
                            Total projects
                        </p>
                        <Link
                            href="/admin/projects"
                            className="text-primary text-sm hover:underline mt-4 inline-block"
                        >
                            Manage Projects →
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{teamMemberCount}</p>
                        <p className="text-muted-foreground text-sm mt-1">
                            Total team members
                        </p>
                        <Link
                            href="/admin/team"
                            className="text-primary text-sm hover:underline mt-4 inline-block"
                        >
                            Manage Team →
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link
                            href="/admin/projects"
                            className="block text-sm text-muted-foreground hover:text-foreground"
                        >
                            • Add new project
                        </Link>
                        <Link
                            href="/admin/team"
                            className="block text-sm text-muted-foreground hover:text-foreground"
                        >
                            • Edit team member
                        </Link>
                        <Link
                            href="/"
                            className="block text-sm text-muted-foreground hover:text-foreground"
                        >
                            • View public site
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
