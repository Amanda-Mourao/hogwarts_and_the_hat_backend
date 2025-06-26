import { z } from "zod";
// Enum to ensure only valid house names are allowed
const houseNameEnum = z.enum([
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
]);
// Schema for initializing progress (e.g., after user registration)
export const initProgressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});
// Schema for marking a house as completed
export const completeHouseSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  houseName: houseNameEnum,
});
