'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setCourses } from '@/lib/redux/slices/courses.slice';
import { MOCK_COURSES } from '@/lib/data/courses';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CourseFilters } from '@/components/course/course-filters';
import { CourseCard } from '@/components/course/course-card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

// export const metadata = {
//   title: 'Courses - LearnHub',
//   description: 'Browse all available courses on LearnHub',
// };

export default function CoursesPage() {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(state => state.courses.items);
  const filters = useAppSelector(state => state.courses.filters);

  // Load courses on mount
  useEffect(() => {
    if (courses.length === 0) {
      dispatch(setCourses(MOCK_COURSES));
    }
  }, [dispatch, courses.length]);

  // Filter courses based on applied filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && course.category !== filters.category) return false;

      // Level filter
      if (filters.level && course.level !== filters.level) return false;

      // Price range filter
      if (course.price < filters.priceRange[0] || course.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating && course.rating < filters.rating) return false;

      return true;
    });
  }, [courses, filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">All Courses</h1>
            <p className="text-lg text-foreground/60">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar - Desktop */}
            <div className="hidden md:block">
              <div className="sticky top-24">
                <CourseFilters />
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Filter Button - Mobile */}
              <div className="md:hidden mb-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 w-full">
                      <Filter className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <CourseFilters />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Courses Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/60 text-lg mb-4">No courses found matching your filters.</p>
                  <Button variant="outline" onClick={() => dispatch(setCourses(MOCK_COURSES))}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
