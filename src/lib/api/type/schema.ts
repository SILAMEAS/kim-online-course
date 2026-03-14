import { registerSchema } from "@/lib/validations/schemas";
import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
  });

export const addressSchema = z.object({
    street: z.string().min(3,"Street must be at least 3 characters long"),
    country: z.string().min(3, "Country must be at least 3 characters long"),
    zip: z.string().min(3, "Zip must be at least 3 characters long"),
    city: z.string().min(3, "City must be at least 3 characters long"),
    state: z.string().min(3, "State must be at least 3 characters long"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    currentUsage: z.boolean(),
});

export const categorySchema = z.object({
    name: z.string().min(3, "Password must be at least 3 characters long"),
});

export const foodSchema = z.object({
    name: z.string(),
    description: z.string().min(3, "description must be at least 3 characters long"),
    price: z.string(),
    discount: z.string(),
    discount_food: z.string(),
    discount_restaurant: z.string(),
    price_with_discount: z.string().optional(),
    restaurantId: z.string(),
    foodType: z.string(),
    categoryId:z.string(),
    available:z.boolean()
});

const AddressSchema = z.object({
    zip:z.string().min(1,"Zip is required"),
    name:z.string().min(1, "Name is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    currentUsage:z.boolean()
});

const ContactInformationSchema = z.object({
    phone: z.string().min(10, "Phone number is required"),
    email: z.string().email("Invalid email address"),
});
export const restaurantSchema = z.object({
    ownerName: z.string().min(1, "Owner name is required"),
    name: z.string().min(1, "Restaurant name is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    cuisineType: z.string().min(1, "Cuisine type is required"),
    address: AddressSchema,
    contactInformation: ContactInformationSchema,
    openingHours: z.string().min(1, "Opening hours are required"),
    open: z.boolean(),
    deliveryFee:z.number(),
    discount:z.number()
});



/** Define the schema for form validation using Zod   */



export type LoginFormData = z.infer<typeof loginSchema>;
export type addressFormData = z.infer<typeof addressSchema>;
export type categoryFormData = z.infer<typeof categorySchema>;
export type foodFormData = z.infer<typeof foodSchema>;
export type RestaurantFormData = z.infer<typeof restaurantSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;