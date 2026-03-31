import { z } from "zod";

const createCategoryValidationSchema = z.object({
    name: z.string().min(1, "Category name is required"),
});

const updateCategoryValidationSchema = z.object({
    name: z.string().min(1, "Category name is required").optional(),
});

export const CategoryValidations = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
