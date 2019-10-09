import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';
import userToken from '../helpers/tokenGenerator';
import con from '../dbConnection';

class userController {
  static async signup(req, res) {
    if (!req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'please insert password',
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jRole,
      address,
      isAdmin,
      department,
    } = req.user.value;
    const registerUser = await con.query(users.addUser, [
      firstName,
      lastName,
      email,
      password,
      gender,
      jRole,
      address,
      isAdmin,
      department,
    ]);
    const user = await con.query(users.withOutPsw, [email]);
    if (registerUser.rowCount === 1) {
      return res.status(201).json({
        status: 201,
        message: 'user successfuly created',
        token: userToken.createToken(user.rows[0].id, user.rows[0].email, user.rows[0].isAdmin),
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
          findRegistedUser.rows[0].id,
          findRegistedUser.rows[0].email,
          findRegistedUser.rows[0].isadmin,
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
