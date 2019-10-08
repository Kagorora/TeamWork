import bcrypt from 'bcrypt-nodejs';
import uuid from 'uuid';
import users from '../models/users';
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
      uuid(),
      firstName,
      lastName,
      email,
      password,
      gender,
      isAdmin,
    ]);
    const user = await con.query(users.withOutPsw, [email]);
    if (registerUser.rowCount === 1) {
      return res.status(201).json({
        status: 201,
        message: 'user successfuly created',
        token: userToken.createToken(id, email, isAdmin),
        data: user.rows[0],
      });
    }
    return res.status(409).json({
      status: 409,
      error: `user with email : ${email} exists`,
    });
  }

  static async login(req, res) {
    const { email, password } = req.user.value;
    const findRegistedUser = await con.query(users.searchUser, [email]);
    if (findRegistedUser.rowCount > 0) {
      const comparePassword = bcrypt.compareSync(
        req.body.password,
        findRegistedUser.rows[0].password,
      );
      if (!comparePassword) {
        return res.status(401).json({
          status: 401,
          error: 'invalid credentials',
        });
      }
      return res.status(200).json({
        status: 200,
        message: `${findRegistedUser.rows[0].email} is successfully logged in`,
        token: userToken.createToken(
          findRegistedUser.id,
          findRegistedUser.email,
          findRegistedUser.isAdmin,
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
