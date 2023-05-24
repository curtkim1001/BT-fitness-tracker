import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import workoutsRouter from "./api/v1/workoutsRouter.js"
import exercisesRouter from "./api/v1/exercisesRouter.js"
import setsRouter from "./api/v1/setsRouter.js"

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/workouts", workoutsRouter)
rootRouter.use("/api/v1/exercises", exercisesRouter)
rootRouter.use("/api/v1/sets", setsRouter)

//place your server-side routes here

export default rootRouter;
