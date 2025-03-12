import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import cors from "cors";
import { dbConnect } from "./lib/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.router.js";
import authRoutes from "./routes/auth.router.js";
import adminRoutes from "./routes/admin.router.js";
import songRoutes from "./routes/song.router.js";
import albumRoutes from "./routes/album.router.js";
import statRoutes from "./routes/stat.router.js";

const app = express();

// Pass no parameters
app.use(clerkMiddleware()); // this will add auth to the req object => req.auth.userId;

dotenv.config();
// app.use(cors());
app.use(express.json()); // to parse req.body
const __dirname = path.resolve();
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max size
    },
  })
);
app.get("/", (req, res) => {
  res.send("hey there");
});

app.use((err, req, res, next) => {
  res
    .status(400)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "internal server error"
          : err.message,
    });
});
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  dbConnect();
});
