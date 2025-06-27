import { Schema, model } from "mongoose";

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
  score: {
    type: Number,
    default: 0,
  },
});

const userProgressModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    houses: [houseProgressModel],
    pointsGryffindor: { type: Number, default: 0 },
    pointsHufflepuff: { type: Number, default: 0 },
    pointsRavenclaw: { type: Number, default: 0 },
    pointsSlytherin: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserProgress = model("UserProgress", userProgressModel);
