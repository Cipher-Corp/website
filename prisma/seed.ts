import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.teamMember.deleteMany();
    await prisma.project.deleteMany();
    await prisma.admin.deleteMany();

    // Seed team members
    const teamMembers = [
        {
            name: "AmirSaeed AryanMehr",
            role: "CEO & ML Engineer",
            bio: "AmirSaeed is the visionary founder of Cipher Corp with over 10 years of experience in machine learning and artificial intelligence. He leads the company's strategic direction and oversees all ML initiatives.",
            instagram: "https://instagram.com/amirsaeed",
            linkedin: "https://linkedin.com/in/amirsaeed",
            twitter: "https://x.com/amirsaeed",
            email: "amirsaeed@ciphercorp.com",
            order: 0,
        },
        {
            name: "Illya Steki",
            role: "CTO & Data Architect",
            bio: "Illya brings deep expertise in distributed systems and data architecture. He's responsible for building scalable infrastructure that powers our ML pipelines and ensures data integrity across all projects.",
            instagram: "https://instagram.com/illyasteki",
            linkedin: "https://linkedin.com/in/illyasteki",
            twitter: "https://x.com/illyasteki",
            email: "illya@ciphercorp.com",
            order: 1,
        },
        {
            name: "Alireza Darparesh",
            role: "Lead Data Scientist",
            bio: "Alireza specializes in statistical modeling and predictive analytics. With a PhD in Applied Mathematics, he transforms complex business problems into elegant data-driven solutions.",
            instagram: "https://instagram.com/alirezad",
            linkedin: "https://linkedin.com/in/alirezad",
            twitter: "https://x.com/alirezad",
            email: "alireza@ciphercorp.com",
            order: 2,
        },
        {
            name: "Abolfazl FarazNejad",
            role: "Senior Software Engineer",
            bio: "Abolfazl is our full-stack wizard who bridges the gap between ML models and production systems. He ensures our solutions are not just smart, but also fast, reliable, and user-friendly.",
            instagram: "https://instagram.com/abolfazlf",
            linkedin: "https://linkedin.com/in/abolfazlf",
            twitter: "https://x.com/abolfazlf",
            email: "abolfazl@ciphercorp.com",
            order: 3,
        },
    ];

    for (const member of teamMembers) {
        await prisma.teamMember.create({ data: member });
    }
    console.log(`✓ Seeded ${teamMembers.length} team members`);

    // Seed admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
        data: {
            email: "admin@ciphercorp.com",
            password: hashedPassword,
        },
    });
    console.log("✓ Seeded admin account (admin@ciphercorp.com / admin123)");

    // Seed projects
    const projects = [
        {
            title: "Neural Vision Pro",
            description: "Advanced computer vision system for real-time object detection and tracking in industrial environments.",
            content: `Neural Vision Pro is our flagship computer vision solution designed for industrial automation. The system uses state-of-the-art deep learning models to detect, classify, and track objects in real-time with 99.7% accuracy.

Key Features:
• Real-time processing at 60 FPS
• Multi-camera support with synchronized tracking
• Custom model training for specific use cases
• Edge deployment capabilities
• Integration with existing SCADA systems

The system has been deployed in over 50 manufacturing facilities worldwide, reducing quality control costs by an average of 40%.`,
            imageUrl: "/images/neural-vision.jpg",
            tags: "Computer Vision,Deep Learning,Industrial AI",
            order: 0,
        },
        {
            title: "PredictFlow Analytics",
            description: "Predictive analytics platform for demand forecasting and inventory optimization.",
            content: `PredictFlow Analytics is an enterprise-grade predictive analytics platform that helps businesses forecast demand and optimize inventory levels with unprecedented accuracy.

Key Features:
• Multi-variate time series forecasting
• Automatic feature engineering
• Explainable AI for business insights
• Real-time dashboard and alerts
• API-first architecture for easy integration

Our clients have reported an average 25% reduction in inventory costs and 15% improvement in service levels after implementing PredictFlow.`,
            imageUrl: "/images/predictflow.jpg",
            tags: "Predictive Analytics,Time Series,Forecasting",
            order: 1,
        },
        {
            title: "DataMesh Platform",
            description: "Unified data platform for seamless data integration, transformation, and governance.",
            content: `DataMesh Platform is a comprehensive data management solution that enables organizations to build a unified, governed data ecosystem.

Key Features:
• Automated data pipeline orchestration
• Built-in data quality monitoring
• Self-service data catalog
• Role-based access control
• Support for 100+ data connectors

DataMesh has helped enterprises reduce data preparation time by 60% while ensuring compliance with data governance policies.`,
            imageUrl: "/images/datamesh.jpg",
            tags: "Data Engineering,ETL,Data Governance",
            order: 2,
        },
    ];

    for (const project of projects) {
        await prisma.project.create({ data: project });
    }
    console.log(`✓ Seeded ${projects.length} sample projects`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
