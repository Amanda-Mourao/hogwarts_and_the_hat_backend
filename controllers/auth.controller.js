import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { username, email, password, userProgressId } = req.body;

  //   const exists = await User.findOne({ email });
  //   if (exists)
  //     return res.status(409).json({ message: "E-Mail already in use." });

  // Email überprüfen
  const emailInUse = await User.exists({ email });
  if (emailInUse) throw new ErrorResponse("Go to login", 200);

  // Passwort absichern
  const salt = await bcrypt.genSalt(15);
  const hashedPW = await bcrypt.hash(password, salt);

  // User abspeichern
  const user = await User.create({
    username,
    email,
    password: hashedPW,
    userProgressId,
  });

  delete user.password;

  //   res
  //     .status(201)
  //     .json({ userId: userId, username: user.username, email: user.email });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password").lean();
  if (!user) throw new ErrorResponse("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ErrorResponse("Invalid credentials", 401);

  delete user.password;
  //   res.json({ userId: user._id, username: user.username, currentHouse: user.currentHouse });
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful." });
};

export { registerUser, login, logout };
