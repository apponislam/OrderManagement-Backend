export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface IOrderItem {
    productId: string;
    productName?: string;
    price?: number;
    quantity: number;
}

export interface IOrder {
    _id?: string;
    customerName: string;
    items: IOrderItem[];
    totalPrice?: number;
    status?: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
