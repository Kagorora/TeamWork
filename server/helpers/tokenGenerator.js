import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class tokenGenerator {
  static createToken(email) {
    const token = jwt.sign({ email }, process.env.TOKEN_KEY);
    return token;
  }
}

export default tokenGenerator;
