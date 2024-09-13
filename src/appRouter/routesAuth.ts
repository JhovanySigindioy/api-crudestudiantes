import { Router } from "express";
import { controllerLoginUser, controllerRegisterUser } from "../controller/auth";

export const routesAuth = Router();

routesAuth
    .post("/auth/login", controllerLoginUser)
    .post("/auth/", controllerRegisterUser)
