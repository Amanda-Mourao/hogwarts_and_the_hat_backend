import { z } from "zod";
// Enum to ensure only valid house names are allowed
const houseNameEnum = z.enum([
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
]);

// Schema for a single house's progress including score
const houseProgressSchema = z.object({
  houseName: houseNameEnum,
  isCompleted: z.boolean().optional(),
  completedAt: z.date().nullable().optional(),
  score: z.number().optional(),
});

// Main UserProgress schema including points per house
export const userProgressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  houses: z.array(houseProgressSchema).optional(),
  pointsGryffindor: z.number().optional(),
  pointsHufflepuff: z.number().optional(),
  pointsRavenclaw: z.number().optional(),
  pointsSlytherin: z.number().optional(),
});
// Schema for initializing progress (e.g., after user registration)
export const initProgressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});
// Schema for marking a house as completed
export const completeHouseSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  houseName: houseNameEnum,
});
