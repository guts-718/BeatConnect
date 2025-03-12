import Album from "../models/album.model.js";
import Song from "../models/song.model.js";
import cloudinary from "./../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("error in uploading file to cloudinary", error);
    throw new Error("Error uploading to cloudinary ");
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await song.findByIdAndDelete(id);
    res.status(200).json({ message: "song deleted successfully" });
  } catch (error) {
    console.log("error in deleting the song");
    next(error);
  }
};
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "please upload all the files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
  } catch (error) {
    console.log("could not create song");
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releasedYear } = req.body;
    const { imageFile } = req.file;
    if (!imageFile) {
      console.log("please add an image file");
      return res
        .status(400)
        .json({ success: true, message: "please add image for the album" });
    }
    const imageUrl = await uploadToCloudinary(imageFile);
    const newAlbum = new Album({
      title,
      artist,
      imageUrl,
      releasedYear,
    });
    await newAlbum.save();
    res
      .status(200)
      .json({ success: true, message: "new album successfully created" });
  } catch (error) {
    console.log("could not create album");
    next(error);
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "album deleted successfully" });
  } catch (error) {
    console.log("error in deleting the album");
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
