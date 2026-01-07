import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/login-form";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/admin/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <LoginForm />
        </div>
    );
}
