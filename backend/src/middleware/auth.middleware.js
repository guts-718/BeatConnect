import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    console.log("unauthorized");
    return res
      .status(401)
      .json({
        success: false,
        message: "unauthorized - you must be logged in",
      });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      res
        .status(403)
        .json({ success: false, message: "must be an admin to execute this " });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
