import {Button} from "@/components/ui/button";
import {Award, BookOpen, Globe, HeartHandshake, Target, Users,} from "lucide-react";
import {Footer} from "@/components/footer.tsx";
import {Navbar} from "@/components/navbar.tsx";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export default function AboutPage() {
    const {t} = useTranslation();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

                    {/* Hero */}
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-xl md:text-4xl font-bold mb-3">
                            {t(Localization("about_page", "title"))}
                        </h1>

                        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
                            {t(Localization("about_page", "subtitle"))}
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-10 mb-16">

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Target className="w-10 h-10 text-primary"/>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {t(Localization("about_page", "mission_title"))}
                                </h2>
                            </div>
                            <p className="text-foreground/80 leading-relaxed">
                                {t(Localization("about_page", "mission_description"))}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Globe className="w-10 h-10 text-primary"/>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {t(Localization("about_page", "vision_title"))}
                                </h2>
                            </div>
                            <p className="text-foreground/80 leading-relaxed">
                                {t(Localization("about_page", "vision_description"))}
                            </p>
                        </div>

                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h2 className="text-xl md:text-4xl font-bold text-center mb-10">
                            {t(Localization("about_page", "core_values_title"))}
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <BookOpen className="w-10 h-10 text-primary mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("about_page", "quality_first_title"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("about_page", "quality_first_description"))}
                                </p>
                            </div>

                            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <Users className="w-10 h-10 text-primary mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("about_page", "learner_centered_title"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("about_page", "learner_centered_description"))}
                                </p>
                            </div>

                            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <Award className="w-10 h-10 text-primary mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("about_page", "excellence_title"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("about_page", "excellence_description"))}
                                </p>
                            </div>

                            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <HeartHandshake className="w-10 h-10 text-primary mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("about_page", "inclusivity_title"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("about_page", "inclusivity_description"))}
                                </p>
                            </div>

                            <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <Target className="w-10 h-10 text-primary mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("about_page", "results_driven_title"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("about_page", "results_driven_description"))}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Stats */}
                    <div className="text-center space-y-6 mb-12">
                        <h2 className="text-xl md:text-4xl font-bold">
                            {t(Localization("about_page", "journey_title"))}
                        </h2>

                        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto pt-6">

                            <div>
                                <p className="text-xl md:text-4xl font-bold text-primary">
                                    85k+
                                </p>
                                <p className="text-lg text-foreground/70 mt-2">
                                    {t(Localization("about_page", "happy_learners"))}
                                </p>
                            </div>

                            <div>
                                <p className="text-xl md:text-4xl font-bold text-primary">
                                    420+
                                </p>
                                <p className="text-lg text-foreground/70 mt-2">
                                    {t(Localization("about_page", "quality_courses"))}
                                </p>
                            </div>

                            <div>
                                <p className="text-xl md:text-4xl font-bold text-primary">
                                    60+
                                </p>
                                <p className="text-lg text-foreground/70 mt-2">
                                    {t(Localization("about_page", "expert_instructors"))}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Button size="lg" className="text-lg px-8 py-6">
                            <a href="/courses" className="text-white no-underline">
                                {t(Localization("about_page", "cta_button"))}
                            </a>
                        </Button>
                    </div>

                </div>
            </main>

            <Footer/>
        </div>
    );
}