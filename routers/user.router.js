import { Router } from "express";
import { login, registerUser, logout } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../zod-schemas/user.schema.js";

const userRouter = Router();

// /signup, /register
userRouter.post("/register", validate(registerSchema), registerUser);

// /signin, /login
userRouter.post("/login", validate(loginSchema), login);

// /logout
userRouter.post("/logout", logout);

export default userRouter;
