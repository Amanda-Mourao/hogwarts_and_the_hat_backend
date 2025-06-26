import { Schema, model } from "mongoose";

const userProgressModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    houses: [houseProgressModel], // Array von Häusern mit Fortschritt
  },
  { timestamps: true }
);

const houseProgressModel = new Schema({
  houseName: {
    type: String,
    enum: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"],
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

export const UserProgress = model("UserProgress", userProgressModel);
