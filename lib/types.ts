export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio?: string;
  studentsCount?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  description: string;
  video_url?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  rating: number;
  reviews_count: number;
  instructor: Instructor;
  image: string;
  duration: number; // in hours
  students_count: number;
  curriculum: Lesson[];
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  course_id: string;
  course_title: string;
  issued_date: string;
  completion_percentage: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  enrolled_courses: string[];
  role: 'student' | 'instructor' | 'admin';
  certificates: Certificate[];
  created_at: Date;
}

export interface CartItem {
  id: string;
  course_id: string;
  course_title: string;
  price: number;
  image: string;
  instructor_name: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  quantity: number;
}

export interface Review {
  id: string;
  course_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  rating: number;
  title: string;
  comment: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentData {
  course_id: string;
  course_title: string;
  instructor_name: string;
  price: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}
