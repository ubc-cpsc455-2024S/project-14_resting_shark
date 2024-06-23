import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthService {
  // user registration
  public async registerUser(username: string, password: string) {
    try {
      const usernameAlreadyExists = await User.findOne({ username });

      if (usernameAlreadyExists) {
      throw new Error('Username already exists');
      }

      const newUser = await User.create({ username, password });
      const foundUser = await User.findOne({ username });
      const token = this.getJwtToken(foundUser?._id, foundUser?.username);

      return newUser;
    } catch (error: any) {
      console.error('Error:', error);
      throw new Error(error.message.toString());
    }
  }

  // user login
  public async loginUser(username: string, password: string) {
    try {
      const foundUser = await User.findOne({ username });

      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid credentials');
      }

      return this.getJwtToken(foundUser._id, foundUser.username);

    } catch (error: any) {
      console.error('Error:', error);
      throw new Error(error.message.toString());
    }
  }

  // generate jwt based on user name and id
  private getJwtToken(userId: any, username: any) {
      return jwt.sign(
        { id: userId, username: username },
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' }
      );
  }
}

export default new AuthService();
