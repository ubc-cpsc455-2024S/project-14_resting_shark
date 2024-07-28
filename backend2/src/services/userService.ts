import User from "../models/User";
import ErrorWithCode from "../errors/ErrorWithCode";

class UserService {
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

  // start and end are iso date strings
  public async getUserStats(userId : string, start: string, end: string) {
    
    return {} //TODO
  }


  public async updateUser(userId: string, updateData: Partial<{ username: string, password: string , email: string}>) {
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
}


export default new UserService();
