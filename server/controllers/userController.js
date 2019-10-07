import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';
import findUser from '../helpers/search';
import userToken from '../helpers/tokenGenerator';
import con from '../dbConnection';

class userController {
  static async signup(req, res) {
    const {
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      isAdmin,
    } = req.user.value;
    const registerUser = await con.query(users.addUser, [
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      isAdmin,
    ]);
    if (registerUser.rowCount === 1) {
      const findRegistedUser = await con.query(users.searchUser, [email]);
      return res.status(201).json({
        status: 201,
        message: 'user successfuly created',
        token: userToken.createToken(id, email, isAdmin),
        data: findRegistedUser.rows[0],
      });
    }
    return res.status(409).json({
      status: 409,
      error: `user with email : ${email} exists`,
    });
  }

  static login(req, res) {
    const { email, password } = req.body;
    const foundUser = findUser.searchUser(email);
    if (foundUser) {
      const comparePassword = bcrypt.compareSync(password, foundUser.password);
      if (!comparePassword) {
        return res.status(401).json({
          status: 401,
          error: 'invalid credentials',
        });
      }
      return res.status(200).json({
        status: 200,
        message: `${foundUser.firstName} is successfully logged in`,
        token: userToken.createToken(
          foundUser.id,
          foundUser.email,
          foundUser.isAdmin,
        ),
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'user not found',
    });
  }
}
export default userController;
