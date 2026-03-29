import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { ActivityRoutes } from "../modules/activity/activity.routes";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/category",
        route: CategoryRoutes,
    },
    {
        path: "/product",
        route: ProductRoutes,
    },
    {
        path: "/order",
        route: OrderRoutes,
    },
    {
        path: "/activity",
        route: ActivityRoutes,
    },
    {
        path: "/dashboard",
        route: DashboardRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
