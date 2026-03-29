import { Router } from "express";
import { DashboardControllers } from "./dashboard.controllers";
import auth from "../../middlewares/auth";
import authorize from "../../middlewares/authorized";

const router = Router();

router.get("/stats", auth, authorize(["admin", "manager"]), DashboardControllers.getDashboardStats);
router.get("/restock-queue", auth, authorize(["admin", "manager"]), DashboardControllers.getRestockQueue);

export const DashboardRoutes = router;
