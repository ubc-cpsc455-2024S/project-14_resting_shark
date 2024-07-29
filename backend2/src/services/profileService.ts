import User from "../models/User";
import ProfilePicture from "../models/ProfilePictureConfig";
import Profile from "../models/Profile";
import ErrorWithCode from "../errors/ErrorWithCode";

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

  public async deleteUser(userId : string) {
    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        const error: ErrorWithCode = new Error("User not found");
        error.code = 404;
        throw error;
      }

      return user;

    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }

  public async getUser(userId : string) {
    try {
      const user = await User.findById(userId);
      const userObject = user?.toObject();
      if (!user) {
        const error: ErrorWithCode = new Error("User not found");
        error.code = 404;
        throw error; 
      }
      return userObject;
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }


  public async updateUserPersonalInfo(userId: string, updateData: Partial<{ username: string, password: string , email: string}>) {
    try {
      if (updateData.username) {
        const existingUsername = await User.findOne({ username: updateData.username });
        if (existingUsername && existingUsername._id.toString() !== userId) {
          throw new Error("Username already in use");
        }
      }

      if (updateData.email) {
        const existingEmail = await User.findOne({ email: updateData.email });
        if (existingEmail && existingEmail._id.toString() !== userId) {
          throw new Error("Email already associated with a different account.");
        }
      }

      // Update the user
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

      if (!user) {
        const error: ErrorWithCode = new Error("User not found");
        error.code = 404;
        throw error;
      }

      return user;
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }

  // update non personal information info
  public async updateUser(id: string, user: any) {
    const { _id, username, email, password, ...updateFields } = user;

    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedUser) {
        const error: ErrorWithCode = new Error(`User with id ${id} not found`);
        error.code = 404;
        throw error;
      }
      return updatedUser;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}


export default new ProfileService();
