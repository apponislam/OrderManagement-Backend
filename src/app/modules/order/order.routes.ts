import { Router } from "express";
import { OrderControllers } from "./order.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidations } from "./order.validations";
import auth from "../../middlewares/auth";
import authorize from "../../middlewares/authorized";

const router = Router();

router.post("/", auth, authorize(["admin", "manager"]), validateRequest(OrderValidations.createOrderValidationSchema), OrderControllers.createOrder);

router.get("/", auth, authorize(["admin", "manager"]), OrderControllers.getAllOrders);

router.patch("/:id/status", auth, authorize(["admin", "manager"]), validateRequest(OrderValidations.updateOrderStatusValidationSchema), OrderControllers.updateOrderStatus);

router.patch("/:id/cancel", auth, authorize(["admin", "manager"]), OrderControllers.cancelOrder);

export const OrderRoutes = router;
