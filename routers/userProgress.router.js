import { Router } from "express";
import {getUserProgress, initUserProgress, completeHouse, updateUserProgress} from "../controllers/userProgress.controller.js";
import validate from "../middlewares/validate.js";
import {userProgressSchema, initProgressSchema, completeHouseSchema} from "../zod-schemas/userProgress.schema.js";

const userProgressRouter = Router();

// Hole den Fortschritt eines Users
userProgressRouter.get("/:userId", getUserProgress);

// Initialisiere Fortschritt (z.B. direkt nach Registrierung)
userProgressRouter.post(
  "/init",
  validate(initProgressSchema),
  initUserProgress
);

// Markiere ein Haus als abgeschlossen
userProgressRouter.post(
  "/complete-house",
  validate(completeHouseSchema),
  completeHouse
);

// Fortschritt aktualisieren (z.B. Score/Points)
userProgressRouter.put(
  "/:userId",
  validate(userProgressSchema),
  updateUserProgress
);

export default userProgressRouter;
