import { ICategory } from "../category/category.interface";

export interface IProduct {
    _id?: string;
    name: string;
    categoryId: string | ICategory;
    price: number;
    stock: number;
    minStockThreshold: number;
    status?: "active" | "out-of-stock";
    createdAt?: Date;
    updatedAt?: Date;
}
