import User from "../models/User";

class UserService {

  public async deleteUser(userId : string) {
    try {
      const user = await User.findByIdAndDelete(userId);
      return user;

    } catch (error: any) {
      console.error('Error:', error);
      throw new Error(error.message.toString());
    }
  }
}

export default new UserService();
