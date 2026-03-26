
import { Button } from "@/components/ui/button";
import {
    Users,
    Target,
    Award,
    BookOpen,
    Globe,
    HeartHandshake,
} from "lucide-react";
import {Footer} from "@/components/footer.tsx";
import {Navbar} from "@/components/navbar.tsx";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                    {/* Hero / Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">
                            About Our Platform
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
                            We believe learning should be accessible, engaging, and
                            life-changing. Join thousands of learners building better futures
                            every day.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-10 mb-16">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Target className="w-10 h-10 text-primary" />
                                <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
                            </div>
                            <p className="text-foreground/80 leading-relaxed">
                                To empower people everywhere with high-quality, affordable
                                education that helps them achieve their personal and
                                professional goals — no matter where they are in life.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Globe className="w-10 h-10 text-primary" />
                                <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
                            </div>
                            <p className="text-foreground/80 leading-relaxed">
                                A world where anyone with an internet connection can access
                                world-class learning and unlock their full potential.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                            Our Core Values
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    icon: BookOpen,
                                    title: "Quality First",
                                    desc: "Every course is reviewed and improved continuously.",
                                },
                                {
                                    icon: Users,
                                    title: "Learner-Centered",
                                    desc: "Your success and experience drive every decision.",
                                },
                                {
                                    icon: Award,
                                    title: "Excellence",
                                    desc: "We partner only with top instructors and experts.",
                                },
                                {
                                    icon: HeartHandshake,
                                    title: "Inclusivity",
                                    desc: "Education should be open to everyone.",
                                },
                                {
                                    icon: Target,
                                    title: "Results-Driven",
                                    desc: "We focus on real-world skills and outcomes.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <item.icon className="w-10 h-10 text-primary mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-foreground/70">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Story / Stats section */}
                    <div className="text-center space-y-6 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Our Journey So Far
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-6">
                            {[
                                { number: "85k+", label: "Happy Learners" },
                                { number: "420+", label: "Quality Courses" },
                                { number: "60+", label: "Expert Instructors" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <p className="text-4xl md:text-5xl font-bold text-primary">
                                        {stat.number}
                                    </p>
                                    <p className="text-lg text-foreground/70 mt-2">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="text-lg px-8 py-6">
                            <a href="/courses" className="text-white no-underline">
                                Start Learning Today
                            </a>
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
