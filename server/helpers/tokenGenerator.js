import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class tokenGenerator {
  static createToken(id, email, isAdmin) {
    const token = jwt.sign({ id, email, isAdmin }, process.env.TOKEN_KEY);
    return token;
  }
}

export default tokenGenerator;
