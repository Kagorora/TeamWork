/* eslint-disable consistent-return */
import bcrypt from 'bcrypt-nodejs';
import uuid from 'uuid';
import userValidation from '../helpers/userValidation';

class userValidate {
  static signup(req, res, next) {
    const result = userValidation.SignUpschema.validate({
      id: uuid(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      gender: req.body.gender,
      isAdmin: req.body.isAdmin,
    });

    if (!result.error) {
      req.user = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message
        .replace('"', ' ')
        .replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static login(req, res, next) {
    const result = userValidation.Loginschema.validate({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    if (!result.error) {
      req.user = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message
        .replace('"', ' ')
        .replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }
}

export default userValidate;
