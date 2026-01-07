import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TeamMemberCardProps {
    id: string;
    name: string;
    role: string;
}

export function TeamMemberCard({ name, role }: TeamMemberCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg">{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{role}</p>
            </CardContent>
        </Card>
    );
}
