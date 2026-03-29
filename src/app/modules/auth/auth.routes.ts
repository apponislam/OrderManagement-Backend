import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validations";

const router = Router();

router.post("/signup", validateRequest(AuthValidations.signupValidationSchema), AuthControllers.signup);

router.post("/login", validateRequest(AuthValidations.loginValidationSchema), AuthControllers.login);

export const AuthRoutes = router;
