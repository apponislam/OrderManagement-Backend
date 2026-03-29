import { z } from "zod";

const createProductValidationSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    categoryId: z.string().min(1, "Category is required"),
    price: z.number().positive("Price must be a positive number"),
    stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
    minStockThreshold: z.number().int("Threshold must be an integer").min(0, "Threshold cannot be negative"),
});

const updateProductValidationSchema = z.object({
    name: z.string().min(1, "Product name cannot be empty").optional(),
    categoryId: z.string().optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative").optional(),
    minStockThreshold: z.number().int("Threshold must be an integer").min(0, "Threshold cannot be negative").optional(),
    status: z.enum(["active", "out-of-stock"]).optional(),
});

export const ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
