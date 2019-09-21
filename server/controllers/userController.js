import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';
import findUser from '../helpers/search';
import newUser from '../helpers/newUser';
import description from '../helpers/message';

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
        users.push(newEmployee);
        return res.status(201).json({
          status: 201,
          message: 'User created successfully',
          data: newEmployee,
        });
      }
      return res.status(201).json({
        status: 401,
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
    const foundUser = findUser.searchUser(req.body.email);
    if (foundUser) {
      const comparePassword = bcrypt.compareSync(req.body.password, foundUser.password);
      if (!comparePassword) {
        return res.status(403).json({
          status: 403,
          error: 'incorect email or password',
        });
      }
      return res.status(200).json({
        status: 200,
        message: `${foundUser.firstName}  is successfully logged in”`,
        data: foundUser,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'user not found',
    });
  }
}
export default userController;
