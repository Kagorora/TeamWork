import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';
import findUser from '../helpers/search';
import newUser from '../helpers/new';
import description from '../helpers/message';
import userToken from '../helpers/tokenGenerator';
import loginValidation from '../helpers/loginValidation';

class userController {
  static welcome(req, res) {
    return res.status(200).json({
      status: 200,
      message: description,
    });
  }

  static signup(req, res) {
    if (!newUser.newU(req).error) {
      if (!findUser.searchUser(req.body.email)) {
        const newEmployee = newUser.newU(req).value;
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
    const wrongInput = newUser.newU(req).error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: wrongInput,
    });
  }

  static login(req, res) {
    const { email, password } = req.body;
    const credentials = loginValidation.validate({
      email, password,
    });
    if (!credentials.error) {
      const foundUser = findUser.searchUser(email);
      if (foundUser) {
        const comparePassword = bcrypt.compareSync(req.body.password, foundUser.password);
        if (!comparePassword) {
          return res.status(401).json({
            status: 401,
            error: 'invalid credentials',
          });
        }
        return res.status(200).json({
          status: 200,
          message: `${foundUser.firstName} is successfully logged in`,
          data: foundUser,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    const wrongInput = credentials.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: wrongInput,
    });
  }
}
export default userController;
