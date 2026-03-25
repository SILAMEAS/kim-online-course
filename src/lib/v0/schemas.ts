import { z } from 'zod';

// User Schema
export const userSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).default('STUDENT'),
  isActive: z.boolean().default(true),
  joinedAt: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

// Course Schema
export const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Course title is required'),
  description: z.string().min(1, 'Description is required'),
  instructorId: z.string().min(1, 'Instructor is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  imageId: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  createdAt: z.string().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Video Schema
export const videoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Video title is required'),
  description: z.string().optional(),
  courseId: z.string().min(1, 'Course is required'),
  videoUrl: z.string().url('Invalid video URL'),
  duration: z.coerce.number().min(0, 'Duration must be positive'),
  sequenceNumber: z.coerce.number().min(1, 'Sequence number must be at least 1'),
  createdAt: z.string().optional(),
});

export type VideoFormData = z.infer<typeof videoSchema>;

// Payment Schema
export const paymentSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User is required'),
  courseId: z.string().min(1, 'Course is required'),
  amount: z.coerce.number().min(0, 'Amount must be non-negative'),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER']).default('CREDIT_CARD'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']).default('PENDING'),
  paidAt: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

// Enrollment Schema
export const enrollmentSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User is required'),
  courseId: z.string().min(1, 'Course is required'),
  status: z.enum(['ACTIVE', 'COMPLETED', 'DROPPED']).default('ACTIVE'),
  enrolledAt: z.string().optional(),
  completedAt: z.string().optional(),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

// Image Schema
export const imageSchema = z.object({
  id: z.string().optional(),
  filename: z.string().min(1, 'Filename is required'),
  fileSize: z.coerce.number().min(0),
  mimeType: z.string().min(1, 'MIME type is required'),
  url: z.string().url('Invalid image URL'),
  altText: z.string().optional(),
  uploadedAt: z.string().optional(),
});

export type ImageFormData = z.infer<typeof imageSchema>;
