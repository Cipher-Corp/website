"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BlurFade,
  FadeUp,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  GradientOrb,
} from "@/components/motion";
import { motion } from "framer-motion";
import { Brain, Database, Code, Zap, Shield, Users, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Machine Learning",
    description:
      "Building intelligent systems that learn and adapt from data to solve complex problems.",
    icon: Brain,
  },
  {
    title: "Data Science",
    description:
      "Extracting meaningful insights from large datasets to drive informed decision-making.",
    icon: Database,
  },
  {
    title: "Software Development",
    description:
      "Creating robust, scalable applications that bring ML models to production.",
    icon: Code,
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "99.7%", label: "Model Accuracy" },
  { value: "40%", label: "Cost Reduction" },
  { value: "24/7", label: "Support" },
];

const capabilities = [
  "Custom ML model development",
  "Real-time data processing",
  "Predictive analytics",
  "Computer vision solutions",
  "Natural language processing",
  "MLOps & deployment",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center sm:py-24 lg:py-32 overflow-hidden">
        <GradientOrb className="w-96 h-96 -top-48 -left-48" />
        <GradientOrb className="w-72 h-72 -bottom-36 -right-36" />

        <BlurFade delay={0}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Welcome to{" "}
            <span className="text-primary">Cipher Corp</span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            We are a machine learning and data science software company, building
            innovative solutions that transform data into actionable insights.
          </p>
        </BlurFade>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/about">Meet Our Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>
        </FadeUp>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-primary/5">
        <div className="container mx-auto px-4 py-12">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-primary sm:text-4xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <FadeUp>
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
              What We Do
            </h2>
            <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with deep domain expertise to deliver solutions that matter.
            </p>
          </FadeUp>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <HoverScale>
                  <div className="rounded-xl border bg-card p-6 h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <FadeUp>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                End-to-End ML Solutions
              </h2>
              <p className="text-muted-foreground mb-8">
                From data collection to model deployment, we handle every aspect of your machine learning journey. Our team of experts ensures your AI initiatives deliver real business value.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="rounded-xl border bg-card p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold">Fast Deployment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Models to production in weeks
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-xl border bg-card p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold">Enterprise Security</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    SOC 2 compliant infrastructure
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-xl border bg-card p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold">Expert Team</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    PhD-level data scientists
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-xl border bg-card p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <Database className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold">Scalable</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Handle millions of predictions
                  </p>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <FadeUp>
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border p-8 sm:p-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
                Ready to Transform Your Data?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&apos;s discuss how Cipher Corp can help you leverage machine learning to drive growth and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/projects">
                    Explore Our Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Meet the Team</Link>
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
