import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
}

export function ProjectCard({ title, description }: ProjectCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
