"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Fade up animation for sections
export function FadeUp({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger children animation container
export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger item (child of StaggerContainer)
export function StaggerItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Scale on hover for cards
export function HoverScale({
    children,
    className = "",
    scale = 1.02,
}: {
    children: ReactNode;
    className?: string;
    scale?: number;
}) {
    return (
        <motion.div
            whileHover={{ scale, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Blur fade in for hero text
export function BlurFade({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Animated gradient background
export function GradientOrb({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`absolute rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-3xl ${className}`}
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

// Export motion for custom use
export { motion };
export type { HTMLMotionProps };
