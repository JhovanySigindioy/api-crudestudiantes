import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { routesStudent, routesSubject, routesAuth } from "../appRouter";
import { verifyToken } from "../middleware/verifyToken";

export const appServer: Application = express();

//middlewares 
appServer.use(cors());

appServer.use(morgan('dev'));
appServer.use(express.json());
appServer.use("/api", routesAuth);
appServer.use("/api", verifyToken, routesStudent);
appServer.use("/api", verifyToken, routesSubject);

