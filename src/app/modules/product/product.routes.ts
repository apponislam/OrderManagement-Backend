import { Router } from "express";
import { ProductControllers } from "./product.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidations } from "./product.validations";
import auth from "../../middlewares/auth";
import authorize from "../../middlewares/authorized";

const router = Router();

router.post("/", auth, authorize(["admin", "manager"]), validateRequest(ProductValidations.createProductValidationSchema), ProductControllers.createProduct);

router.get("/", auth, authorize(["admin", "manager"]), ProductControllers.getAllProducts);

router.patch("/:id", auth, authorize(["admin", "manager"]), validateRequest(ProductValidations.updateProductValidationSchema), ProductControllers.updateProduct);

export const ProductRoutes = router;
