import { Router } from "express";
import { registerUser, loginUser, verifyUser, getUser } from "../controllers/userController";
import userAuthMiddleware from "../middlewares/userAuth";
import signupValidation from "../middlewares/formValidation.ts/signupValidation";
import loginValidation from "../middlewares/formValidation.ts/loginValidation";

const  router = Router();

router.post("/register",signupValidation, registerUser);
router.post("/login",loginValidation, loginUser);
router.put("/verify", verifyUser);
router.get('/user', userAuthMiddleware, getUser);

export default router;