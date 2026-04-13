import {z} from "zod";

// Email
export const emailSchema = z
    .string({
        required_error: "Email is required",
    })
    .email("Invalid email format");

// Password (enterprise-level)
export const passwordSchema = z
    .string({
        required_error: "Password is required",
    })
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character");

// Phone
export const phoneSchema = z
    .string()
    .regex(/^[0-9]{8,15}$/, "Invalid phone number");


// Select (dropdown)
export const selectNumberSchema = (field: string) =>
    z.coerce
        .number({
            required_error: `${field} is required`,
        })
        .min(1, `${field} must be selected`);

// ID
export const idSchema = z.number().int().positive();

// Price
export const priceSchema = z
    .coerce
    .number()
    .min(0, "Price must be positive");

// Quantity
export const quantitySchema = z
    .coerce
    .number()
    .int()
    .min(1, "Minimum 1");


// Base file
export const fileOrUrlSchema = z
    .union([
        z.instanceof(File), // Accept a File object
        z.string().url("Invalid URL"), // Accept a valid URL string
    ])
    .refine((file) => file !== null && file !== undefined, {
        message: "File or URL is required",
    });
export const fileSchema = z
    .any()
    .refine((file) => file instanceof File, {
        message: "File is required",
    });

// Image
export const imageFileSchema = fileSchema
    .refine((file) => file.type.startsWith("image/"), {
        message: "Only images allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "Max size 5MB",
    });

// Video
export const videoFileSchema = fileSchema
    .optional()
    .refine(file => !file || file.type.startsWith("video/"), {
        message: "Only videos allowed",
    })
    .refine(file => !file || file.size <= 50 * 1024 * 1024, {
        message: "Max size 50MB",
    });

// Optional file (edit mode)
export const optionalFileSchema = fileSchema.optional();


// Date
export const dateSchema = z.coerce.date({
    required_error: "Date is required",
});

// Future date
export const futureDateSchema = dateSchema.refine(
    (date) => date > new Date(),
    {message: "Date must be in the future"}
);


export const booleanSchema = z.boolean();

// Status enum
export const statusSchema = z.enum(["ACTIVE", "INACTIVE", "PENDING"]);


export const urlSchema = z.string().url("Invalid URL");

export const slugSchema = z
    .string()
    .regex(/^[a-z0-9-]+$/, "Invalid slug format");

//----------------------------- FEILD

// First name
export const firstNameSchema = z
    .string({required_error: "First name is required"})
    .min(2, "First name must be at least 2 characters");

// Last name
export const lastNameSchema = z
    .string({required_error: "Last name is required"})
    .min(2, "Last name must be at least 2 characters");

// Role (dynamic or fixed)

export const roleSchema = z.enum(
    ["STUDENT", "INSTRUCTOR", "ADMIN"],
    {
        required_error: "Role is required",
    }
);

// 🔹 Title
export const courseTitleSchema = z
    .string({required_error: "Title is required"})
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters");

// 🔹 Category
export const COURSE_CATEGORIES = [
    "WEB_DEVELOPMENT",
    "DATA_SCIENCE",
    "DESIGN",
    "MOBILE_DEVELOPMENT",
    "CLOUD_COMPUTING",
    "DEV_OPS",
    "BUSINESS",
] as const;

export const categorySchema = z.enum(COURSE_CATEGORIES);

// 🔹 Avatar URL
export const avatarSchema = z
    .string()
    .url("Invalid avatar URL")
    .optional();

// 🔹 File (image/video/etc.)
// export const fileSchema = z
//     .any()
//     .refine((file) => {
//         if (!file) return true; // optional
//         return file instanceof File || typeof file === "string";
//     }, {
//         message: "Invalid file",
//     });

// 🔹 Description
export const descriptionSchema = z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional();

// 🔹 Instructor ID
export const instructorIdSchema = z
    .coerce
    .number({
        required_error: "Instructor is required",
    })
    .min(1, "Instructor must be selected");

// 🔹 Level
export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export const levelSchema = z.enum(COURSE_LEVELS);

// 🔹 Price
// export const priceSchema = z
//     .coerce
//     .number()
//     .min(0, "Price must be greater than or equal to 0")
//     .optional();

// 🔹 Status
export const COURSE_STATUS = ["DRAFT", "PUBLISHED"] as const;
export const courseStatusSchema = z.enum(COURSE_STATUS);