import User from "../models/User";
import ProfilePicture from "../models/ProfilePictureConfig";
import Profile from "../models/Profile";
import ErrorWithCode from "../errors/ErrorWithCode";
import mongoose from "mongoose";

class ProfileService {
  public async getProfileConfigs() {
    try {
      const configs = await Profile.findOne();
      return configs;

    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }

  // if user does not have a profile, creates one. if user does, then updates
  public async updateProfile(userId: string, profile: any) {
    try {
      const user = await User.findById(userId);
      if (!user?.profile) {
        const newProfile = await ProfilePicture.create({
          bgColor: profile.bgColor || "",                
          baseImage: profile.baseImage || "",                
          accessory: profile.accessory || "",                    
          heldItem: profile.heldItem || "",
        });

        const profileId = new mongoose.Types.ObjectId(newProfile._id);
        await User.findByIdAndUpdate(userId, { profile: profileId })
        return newProfile;
      } else {
        const updatedProfile = await ProfilePicture.findByIdAndUpdate(user.profile, profile, { new: true });
        return updatedProfile;
      }
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }

}


export default new ProfileService();
