import { UserProgress } from "../models/UserProgress.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// GET /:userId - Hole den Fortschritt eines Users
export const getUserProgress = async (req, res) => {
  const { userId } = req.params;
  const progress = await UserProgress.findOne({ userId });
  if (!progress) throw new ErrorResponse("UserProgress not found", 404);
  res.json({ data: progress });
};

// POST /init - Fortschritt initialisieren (z.B. nach Registrierung)
export const initUserProgress = async (req, res) => {
  const { userId } = req.body;
  // Initiale Häuser anlegen
  const houses = [
    { houseName: "Gryffindor" },
    { houseName: "Slytherin" },
    { houseName: "Hufflepuff" },
    { houseName: "Ravenclaw" },
  ];
  // Prüfe, ob schon vorhanden
  const exists = await UserProgress.findOne({ userId });
  if (exists) throw new ErrorResponse("Progress already exists", 409);

  const progress = await UserProgress.create({
    userId,
    houses,
  });
  res.status(201).json({ data: progress });
};

// POST /complete-house - Ein Haus als abgeschlossen markieren
export const completeHouse = async (req, res) => {
  const { userId, houseName } = req.body;
  const progress = await UserProgress.findOne({ userId });
  if (!progress) throw new ErrorResponse("Progress not found", 404);

  const house = progress.houses.find((h) => h.houseName === houseName);
  if (!house) throw new ErrorResponse("House not found", 404);

  house.isCompleted = true;
  house.completedAt = new Date();

  await progress.save();
  res.json({ data: progress });
};

// PUT /:userId - Fortschritt/Score/Points aktualisieren
export const updateUserProgress = async (req, res) => {
  const { userId } = req.params;
  const progress = await UserProgress.findOneAndUpdate({ userId }, req.body, {
    new: true,
  });
  if (!progress) throw new ErrorResponse("Progress not found", 404);
  res.json({ data: progress });
};
