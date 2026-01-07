"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface AnimatedProjectCardProps {
    id: string;
    title: string;
    description: string;
    tags?: string;
    index?: number;
}

export function AnimatedProjectCard({
    id,
    title,
    description,
    tags,
    index = 0,
}: AnimatedProjectCardProps) {
    const tagList = tags ? tags.split(",").slice(0, 3).map((t) => t.trim()) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4 }}
        >
            <Link href={`/projects/${id}`}>
                <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                            {title}
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {description}
                        </p>
                        {tagList.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {tagList.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export interface AnimatedTeamMemberCardProps {
    id: string;
    name: string;
    role: string;
    index?: number;
}

export function AnimatedTeamMemberCard({
    id,
    name,
    role,
    index = 0,
}: AnimatedTeamMemberCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4 }}
        >
            <Link href={`/team/${id}`}>
                <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer group">
                    <CardHeader>
                        <motion.div
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50 text-2xl font-bold text-primary-foreground"
                            whileHover={{ rotate: 5 }}
                        >
                            {name.charAt(0)}
                        </motion.div>
                        <CardTitle className="text-lg text-center group-hover:text-primary transition-colors">
                            {name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground text-center">{role}</p>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
