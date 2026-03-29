import { z } from "zod";

const signupValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["admin", "manager"], {
        message: "Role is required and must be admin or manager",
    }),
});

const loginValidationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const AuthValidations = {
    signupValidationSchema,
    loginValidationSchema,
};
