import mongoose from "mongoose";

const ProfilePictureSchema = new mongoose.Schema({
  bgColor: String,                      // hex code
  baseImage: String,                    // image url (ex canadian goose, the white goose, the cute brown one)
  accessory: String,                    // image url
  heldItem: String,
});

const ProfilePicture = mongoose.model("ProfilePicture", ProfilePictureSchema);
export default ProfilePicture;