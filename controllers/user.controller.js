import { User } from "../models/User.js";

export const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-passwordHash");
  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    select: "-passwordHash",
  });
  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
};

//   // Nur Felder aktualisieren, die gesetzt sind
//   Object.keys(updateData).forEach(
//     (key) => updateData[key] === undefined && delete updateData[key]
//   );

//   const user = await User.findByIdAndUpdate(req.params.id, updateData, {
//     new: true,
//     select: "-passwordHash",
//   });
//   if (!user) return res.status(404).json({ message: "User not found." });
//   res.json(user);
// };
