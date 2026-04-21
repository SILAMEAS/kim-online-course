import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCourses} from "@/lib/redux/slices/courses.slice";
import {MOCK_COURSES} from "@/lib/data/courses";
import {Navbar} from "@/components/navbar.tsx";
import {Footer} from "@/components/footer.tsx";
import {Button} from "@/components/ui/button";
import {CourseCard} from "@/components/course/course-card";
import {ArrowRight, Star, Trophy, Users} from "lucide-react";
import {DefaultPaginationRequest} from "@/lib/types.ts";
import {useListAllCoursesQuery} from "@/lib/api/api.generated.ts";
import {useTranslation} from "react-i18next";
import {Localization} from "@/i18n/lang";

export default function Home() {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {currentData} = useListAllCoursesQuery(DefaultPaginationRequest);
    const courses = currentData?.contents || [];
    const featuredCourses = courses.slice(0, 6);

    useEffect(() => {
        if (courses.length === 0) {
            dispatch(setCourses(MOCK_COURSES));
        }
    }, [dispatch, courses.length]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1">

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                            <div className="flex-1">
                                <h1 className="text-4xl md:text-4xl font-bold text-balance mb-4">
                                    {t(Localization("home_page", "learn_skills_matter"))}
                                </h1>

                                <p className="text-lg text-foreground/70 text-balance mb-6">
                                    {t(Localization("home_page", "join_us"))}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <Link to="/courses">
                                        <Button size="lg" className="gap-2">
                                            {t(Localization("home_page", "explore_courses"))}
                                            <ArrowRight className="w-4 h-4"/>
                                        </Button>
                                    </Link>

                                    <Button size="lg" variant="outline">
                                        {t(Localization("home_page", "learn_more"))}
                                    </Button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 grid grid-cols-2 gap-6">

                                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                                    <div className="text-3xl font-bold text-primary mb-2">
                                        2.5M+
                                    </div>
                                    <p className="text-sm text-foreground/60">
                                        {t(Localization("home_page", "active_students"))}
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                                    <div className="text-3xl font-bold text-primary mb-2">
                                        500+
                                    </div>
                                    <p className="text-sm text-foreground/60">
                                        {t(Localization("home_page", "courses"))}
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                                    <div className="text-3xl font-bold text-primary mb-2">
                                        4.8★
                                    </div>
                                    <p className="text-sm text-foreground/60">
                                        {t(Localization("home_page", "avg_rating"))}
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                                    <div className="text-3xl font-bold text-primary mb-2">
                                        95%
                                    </div>
                                    <p className="text-sm text-foreground/60">
                                        {t(Localization("home_page", "success_rate"))}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-12 md:py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">

                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                {t(Localization("home_page", "why_choose_us"))}
                            </h2>

                            <p className="text-lg text-foreground/60 text-balance">
                                {t(Localization("home_page", "advance_your_career"))}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            <div className="bg-card border border-border rounded-lg p-8">
                                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Star className="w-6 h-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("home_page", "expert_instructor"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("home_page", "hand_experience"))}
                                </p>
                            </div>

                            <div className="bg-card border border-border rounded-lg p-8">
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("home_page", "active_community"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("home_page", "connect_with_learner"))}
                                </p>
                            </div>

                            <div className="bg-card border border-border rounded-lg p-8">
                                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Trophy className="w-6 h-6 text-primary"/>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {t(Localization("home_page", "certificates"))}
                                </h3>
                                <p className="text-foreground/70">
                                    {t(Localization("home_page", "earn_completion"))}
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Featured Courses Section */}
                <section className="py-12 md:py-20 bg-secondary/30">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">

                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                    {t(Localization("home_page", "featured_courses"))}
                                </h2>
                                <p className="text-foreground/60">
                                    {t(Localization("home_page", "popular_courses"))}
                                </p>
                            </div>

                            <Link to="/courses">
                                <Button variant="outline">
                                    {t(Localization("home_page", "view_all"))}
                                    <ArrowRight className="w-4 h-4 ml-2"/>
                                </Button>
                            </Link>
                        </div>

                        {featuredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredCourses.map((course) => (
                                    <CourseCard key={course.id} course={course}/>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-foreground/60">
                                    Loading courses...
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 md:py-20 bg-primary text-primary-foreground">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t(Localization("home_page", "ready_to_start_learning"))}
                        </h2>

                        <p className="text-lg opacity-90 mb-8 text-balance">
                            {t(Localization("home_page", "cta_description"))}
                        </p>

                        <Link to="/courses">
                            <Button size="lg" variant="secondary">
                                {t(Localization("home_page", "explore_all_courses"))}
                            </Button>
                        </Link>

                    </div>
                </section>

            </main>

            <Footer/>
        </div>
    );
}