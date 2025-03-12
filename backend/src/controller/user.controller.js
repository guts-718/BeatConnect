import User from "../models/user.model.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUser } });
    res.status(201).json(users);
  } catch (error) {
    console.log("error in fetching users");
    next(error);
  }
};
