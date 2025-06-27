import express from "express";
import { mongoose } from "mongoose";
import cors from "cors";
import chalk from "chalk";
import dbInit from "./db/index.js";
import userRouter from "./routers/user.router.js";
import userProgressRouter from "./routers/userProgress.router.js";
import ErrorResponse from "./utils/ErrorResponse.js";
import errorHandler from "./middlewares/errorHandler.js";
import upload from "./middlewares/upload.js";

await dbInit();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/user", userRouter);
app.use("/userProgress", userProgressRouter);

app.get("/", async (req, res) => {
  const dbResponse = await mongoose.connection.db.admin().ping();
  if (dbResponse.ok !== 1) throw new ErrorResponse("DB is not connected", 503);
  res.json({ message: "Running", dbResponse });
});

app.post("/file-upload", upload.single("image"), (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  // const location = `${req.protocol}://${req.host}/${req.file.filename}`;
  res.json({
    message: "File upload successful",
    location: req.file.secure_url,
  });
});

// app.use(/.*/,
app.use("/{*splat}", (req, res) => {
  throw new ErrorResponse(`Check route. You used ${req.originalUrl}`, 404);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreen(`H.A.T. is listening on port ${port} `));
});
