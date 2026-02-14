'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '@/lib/redux/slices/courses.slice';
import { RootState } from '@/lib/redux/store';
import { MOCK_COURSES } from '@/lib/data/courses';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/course/course-card';
import { ArrowRight, Star, Users, Trophy } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses.items);
  const featuredCourses = courses.slice(0, 6);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(setCourses(MOCK_COURSES));
    }
  }, [dispatch, courses.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
                  Learn Skills That Matter
                </h1>
                <p className="text-lg text-foreground/70 text-balance mb-6">
                  Join thousands of students and advance your career with world-class courses from industry experts.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/courses">
                    <Button size="lg" className="gap-2">
                      Explore Courses
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
                  <p className="text-sm text-foreground/60">Active Students</p>
                </div>
                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-foreground/60">Courses</p>
                </div>
                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                  <p className="text-sm text-foreground/60">Avg. Rating</p>
                </div>
                <div className="bg-white dark:bg-card rounded-lg p-6 text-center border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <p className="text-sm text-foreground/60">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LearnHub?</h2>
              <p className="text-lg text-foreground/60 text-balance">
                Everything you need to advance your career and achieve your goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-foreground/70">Learn from industry professionals with years of hands-on experience.</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Active Community</h3>
                <p className="text-foreground/70">Connect with thousands of learners and grow together.</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certificates</h3>
                <p className="text-foreground/70">Earn recognized certificates upon course completion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-12 md:py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Courses</h2>
                <p className="text-foreground/60">Start with our most popular courses</p>
              </div>
              <Link href="/courses">
                <Button variant="outline">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {featuredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/60">Loading courses...</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg opacity-90 mb-8 text-balance">
              Join millions of students learning on LearnHub. Start your first course today for free.
            </p>
            <Link href="/courses">
              <Button size="lg" variant="secondary">
                Explore All Courses
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
