import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // signup
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      res.status(201).json({ success: true, data: user });
    }
  } catch (error) {
    console.log("error in auth callback in auth.router.js", error);
    res.status(500).json({ success: false, message: error });
  }
};
