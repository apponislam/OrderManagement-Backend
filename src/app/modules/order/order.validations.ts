import { z } from "zod";

const createOrderItemValidationSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

const createOrderValidationSchema = z.object({
    customerName: z.string().min(1, "Customer name is required"),
    items: z.array(createOrderItemValidationSchema).min(1, "At least one item is required"),
});

const updateOrderStatusValidationSchema = z.object({
    status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"], {
        message: "Status is required and must be a valid status",
    }),
});

export const OrderValidations = {
    createOrderValidationSchema,
    updateOrderStatusValidationSchema,
};
