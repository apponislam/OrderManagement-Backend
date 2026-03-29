import { z } from "zod";

const createCategoryValidationSchema = z.object({
    name: z.string().min(1, "Category name is required"),
});

export const CategoryValidations = {
    createCategoryValidationSchema,
};
