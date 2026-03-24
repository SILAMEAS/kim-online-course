import {EnumRole, SORT} from "./enum.ts";
import {ListAllCoursesApiArg} from "@/lib/api/api.generated.ts";

export interface Instructor {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio?: string;
    studentsCount?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: EnumRole;
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

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio?: string;
    enrolled_courses: string[];
    role: EnumRole;
    certificates: Certificate[];
    created_at: string;
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

/** Pagination  */

export interface IPagination<T> {
    contents: T[];
    page: number;
    pageSize?: number;
    totalPages?: number;
    total?: number;
    hasNext?: boolean;
    totalInvalid?: number;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiresIn: number;
    accessTokenExpiresIn: number;

}

export interface ProfileResponse {
    id: number;
    firstName: string,
    lastName: string,
    email: string,
    role: EnumRole
}

export const DefaultPaginationRequest: ListAllCoursesApiArg = {
    search:"",
    limit: 10,
    sortBy: 'id',
    page: 1,
    sortOrder: SORT.DESC as string
}

export interface PaginationRequest {

    search?: string;
    filterBy?: string;

    limit: number;
    sortBy: string;
    page: number;
    sortOrder: SORT;

}

// export interface CourseResponse {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     rating: number;
//     reviews_count: number;
//     instructor: Instructor;
//     image: string;
//     duration: number;
//     imageUrl: string;
//     category: string;
//     level: 'Beginner' | 'Intermediate' | 'Advanced';
//     students_count: number;
// }