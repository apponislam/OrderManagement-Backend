export type UserRole = "admin" | "manager";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}
