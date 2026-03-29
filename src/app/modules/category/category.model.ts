import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: [true, "Category name is required"], unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
