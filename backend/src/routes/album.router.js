import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";
// import { getAdmin } from "../controller/admin.controller";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;
