import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import routinesRouter from "./api/v1/routinesRouter.js"
import exercisesRouter from "./api/v1/exercisesRouter.js"

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/routines", routinesRouter)
rootRouter.use("/api/v1/exercises", exercisesRouter)

//place your server-side routes here

export default rootRouter;
