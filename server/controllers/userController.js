import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';
import findUser from '../helpers/search';
import userToken from '../helpers/tokenGenerator';

class userController {
  static signup(req, res) {
    if (!findUser.searchUser(req.body.email)) {
      const newEmployee = req.user.value;
      if (!req.body.password) {
        return res.status(400).json({
          status: 400,
          error: 'password is required',
        });
      }
      users.push(newEmployee);
      return res.status(201).json({
        status: 201,
        token: userToken.createToken(users.length + 1, req.body.email, req.body.isAdmin),
        message: 'User created successfully',
        data: newEmployee,
      });
    }
    return res.status(409).json({
      status: 409,
      error: 'Email already exist',
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
        token: userToken.createToken(foundUser.id, foundUser.email, foundUser.isAdmin),
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'user not found',
    });
  }
}
export default userController;
