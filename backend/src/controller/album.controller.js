import Album from "../models/album.model";
import Song from "../models/song.model";

export const getAllAlbums = async (req, res, next) => {
  try {
    const Albums = await Album.find({});
    res.status(200).json(Albums);
  } catch (error) {
    console.log("could not fetch the albums");
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");
    //const songs=await Song.find({albumId:albumId});
    if (!album) {
      return res.status(404).json({ message: "album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    console.log("could not fetch album with given id");
    next(error);
  }
};
