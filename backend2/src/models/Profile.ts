import mongoose from "mongoose";


const ProfileSchema = new mongoose.Schema({
  bgColor: Array,                      // hex codes
  baseImage: Array,                    // image urls (ex canadian goose, the white goose, the cute brown one)
  accessory: Array,                    // image urls
  heldItem: Array,  
});