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

  public async getUserStats(userId : string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        const error: ErrorWithCode = new Error("User not found");
        error.code = 404;
        throw error; 
      }
      return {
        username: user?.username,
      }
    } catch (error: any) {
      console.error('Error: ', error);
      throw new Error(error.message);
    }
  }
}

export default new UserService();
