import { Review } from '../types';

export const MOCK_REVIEWS: Review[] = [
  // Reviews for Course 1 (React)
  {
    id: 'rev1',
    course_id: '1',
    user_id: 'user1',
    user_name: 'Marcus Johnson',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 5,
    title: 'Best React Course Ever!',
    comment: 'This course completely changed how I understand React. The explanations are clear and the projects are practical. Highly recommended!',
    helpful_count: 324,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: 'rev2',
    course_id: '1',
    user_id: 'user2',
    user_name: 'Sarah Chen',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4,
    title: 'Great Content, Could Use More Examples',
    comment: 'Comprehensive course covering all React concepts. Would benefit from more real-world examples in some sections.',
    helpful_count: 156,
    created_at: '2024-01-20',
    updated_at: '2024-01-20',
  },
  {
    id: 'rev3',
    course_id: '1',
    user_id: 'user3',
    user_name: 'David Wilson',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
    title: 'Perfectly Structured Learning Path',
    comment: 'The progression from basics to advanced topics is excellent. I feel confident building React applications now.',
    helpful_count: 287,
    created_at: '2024-02-01',
    updated_at: '2024-02-01',
  },
  // Reviews for Course 2 (JavaScript)
  {
    id: 'rev4',
    course_id: '2',
    user_id: 'user4',
    user_name: 'Emily Rodriguez',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    rating: 5,
    title: 'Finally Understand Modern JavaScript',
    comment: 'Fantastic course! The async/await section is particularly well-explained. Definitely worth the investment.',
    helpful_count: 198,
    created_at: '2024-01-25',
    updated_at: '2024-01-25',
  },
  {
    id: 'rev5',
    course_id: '2',
    user_id: 'user5',
    user_name: 'James Brown',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4,
    title: 'Good Course, Dense Content',
    comment: 'Very comprehensive. The pace is a bit fast in some sections, but the material is excellent quality.',
    helpful_count: 134,
    created_at: '2024-02-05',
    updated_at: '2024-02-05',
  },
  // Reviews for Course 3 (Web Design)
  {
    id: 'rev6',
    course_id: '3',
    user_id: 'user6',
    user_name: 'Victoria Kim',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria',
    rating: 5,
    title: 'Transformed My Design Skills',
    comment: 'Amazing instructor! The design principles section is gold. I immediately applied these concepts to my projects.',
    helpful_count: 412,
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
  },
  {
    id: 'rev7',
    course_id: '3',
    user_id: 'user7',
    user_name: 'Thomas Anderson',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    rating: 5,
    title: 'Color Theory Finally Makes Sense',
    comment: 'Outstanding explanation of color theory. The practical exercises really help solidify the concepts.',
    helpful_count: 356,
    created_at: '2024-01-28',
    updated_at: '2024-01-28',
  },
  // Reviews for Course 4 (Node.js)
  {
    id: 'rev8',
    course_id: '4',
    user_id: 'user8',
    user_name: 'Rachel Green',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    rating: 4,
    title: 'Solid Backend Foundation',
    comment: 'Great introduction to Node.js and Express. The database section could be expanded, but overall very good.',
    helpful_count: 203,
    created_at: '2024-02-02',
    updated_at: '2024-02-02',
  },
  // Reviews for Course 5 (Python)
  {
    id: 'rev9',
    course_id: '5',
    user_id: 'user9',
    user_name: 'Kevin Park',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    rating: 5,
    title: 'Best Data Science Starter Course',
    comment: 'The instructor makes complex concepts accessible. Loved the practical projects with real datasets.',
    helpful_count: 428,
    created_at: '2024-01-18',
    updated_at: '2024-01-18',
  },
  // Reviews for Course 6 (Machine Learning)
  {
    id: 'rev10',
    course_id: '6',
    user_id: 'user10',
    user_name: 'Nina Patel',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
    rating: 5,
    title: 'Advanced ML Made Understandable',
    comment: 'Excellent course for diving into machine learning. The mathematical foundations are explained clearly.',
    helpful_count: 267,
    created_at: '2024-02-08',
    updated_at: '2024-02-08',
  },
  // Reviews for Course 7 (TypeScript)
  {
    id: 'rev11',
    course_id: '7',
    user_id: 'user11',
    user_name: 'Oliver Stone',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    rating: 5,
    title: 'Master Type Safety',
    comment: 'Perfect for developers wanting to master TypeScript. The generics section is particularly enlightening.',
    helpful_count: 195,
    created_at: '2024-01-30',
    updated_at: '2024-01-30',
  },
  // Reviews for Course 8 (Tailwind)
  {
    id: 'rev12',
    course_id: '8',
    user_id: 'user12',
    user_name: 'Julia Martinez',
    user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
    rating: 5,
    title: 'Build Beautiful UIs Fast',
    comment: 'Tailwind CSS is now my go-to styling framework. This course made it so easy to learn and use effectively.',
    helpful_count: 523,
    created_at: '2024-02-10',
    updated_at: '2024-02-10',
  },
];

export function getReviewsByCourse(courseId: string): Review[] {
  return MOCK_REVIEWS.filter(review => review.course_id === courseId);
}

export function getAverageRating(courseId: string): number {
  const reviews = getReviewsByCourse(courseId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}
