'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/slices/cart.slice';
import { setSelectedCourse } from '@/lib/redux/slices/courses.slice';
import { enrollCourse } from '@/lib/redux/slices/auth.slice';
import { useGetReviewsByCourse } from '@/lib/api/queries';
import { MOCK_COURSES } from '@/lib/data/courses';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CourseCurriculum } from '@/components/course/course-curriculum';
import { ReviewSection } from '@/components/course/review-section';
import { AddReviewForm } from '@/components/course/add-review-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Users, Clock, BookMarked, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const dispatch = useAppDispatch();
  const selectedCourse = useAppSelector(state => state.courses.selectedCourse);
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const enrolledCourses = currentUser?.enrolled_courses || [];

  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviewsByCourse(courseId);

  const [isBuyLoading, setIsBuyLoading] = useState(false);

  // Load course on mount
  useEffect(() => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (course) {
      dispatch(setSelectedCourse(course));
    } else {
      toast.error('Course not found');
      router.push('/courses');
    }
  }, [courseId, dispatch, router]);

  if (!selectedCourse) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-12">
          <p className="text-center text-foreground/60">Loading course details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isEnrolled = enrolledCourses.includes(selectedCourse.id);

  const handleEnroll = async () => {
    if (!currentUser) {
      toast.error('Please login to enroll');
      router.push('/login');
      return;
    }

    setIsBuyLoading(true);

    try {
      // Simulate enrollment
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add to cart first
      dispatch(
        addToCart({
          id: `cart-${selectedCourse.id}`,
          course_id: selectedCourse.id,
          course_title: selectedCourse.title,
          price: selectedCourse.price,
          image: selectedCourse.image,
          instructor_name: selectedCourse.instructor.name,
        })
      );

      toast.success('Course added to cart! Proceed to checkout.');
      router.push('/cart');
    } catch (error) {
      toast.error('Failed to add course. Please try again.');
    } finally {
      setIsBuyLoading(false);
    }
  };

  const handleEnrollEnrolled = async () => {
    setIsBuyLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      dispatch(enrollCourse(selectedCourse.id));
      toast.success('Successfully enrolled in course!');
      router.push('/dashboard/my-courses');
    } catch (error) {
      toast.error('Failed to enroll. Please try again.');
    } finally {
      setIsBuyLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          <Image
            src={selectedCourse.image}
            alt={selectedCourse.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge>{selectedCourse.category}</Badge>
                  <Badge variant="secondary">{selectedCourse.level}</Badge>
                </div>
                <h1 className="text-4xl font-bold mb-4">{selectedCourse.title}</h1>
                <p className="text-lg text-foreground/70 mb-6">{selectedCourse.description}</p>

                {/* Metadata */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedCourse.rating}</span>
                    <span className="text-foreground/60">({selectedCourse.reviews_count} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedCourse.students_count.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedCourse.duration} hours</span>
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Instructor</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} />
                    <AvatarFallback>{selectedCourse.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{selectedCourse.instructor.name}</p>
                    <p className="text-sm text-foreground/60">{selectedCourse.instructor.title}</p>
                    {selectedCourse.instructor.bio && (
                      <p className="text-sm text-foreground/70 mt-2">{selectedCourse.instructor.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <CourseCurriculum curriculum={selectedCourse.curriculum} duration={selectedCourse.duration} />

              {/* Reviews */}
              <div className="space-y-6">
                <ReviewSection
                  reviews={reviews}
                  courseRating={selectedCourse.rating}
                  isLoading={reviewsLoading}
                />
                <AddReviewForm courseId={selectedCourse.id} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg overflow-hidden">
                <div className="relative w-full h-48 bg-secondary">
                  <Image
                    src={selectedCourse.image}
                    alt={selectedCourse.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-3xl font-bold text-primary mb-2">
                      ${selectedCourse.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-foreground/60">One-time payment</p>
                  </div>

                  {isEnrolled ? (
                    <Button className="w-full" disabled>
                      <BookMarked className="w-4 h-4 mr-2" />
                      Already Enrolled
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full gap-2"
                      onClick={handleEnroll}
                      disabled={isBuyLoading}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isBuyLoading ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  )}

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{selectedCourse.duration} hours of content</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>Access on mobile and desktop</span>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-xs text-foreground/60 text-center">
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
