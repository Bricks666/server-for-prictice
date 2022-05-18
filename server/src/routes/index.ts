import { Router } from "express";
import { todoRouter } from "./todo";

export const appRouter = Router();

appRouter.use("/todo/", todoRouter);
