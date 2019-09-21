import bcrypt from 'bcrypt-nodejs';
import users from '../models/users';
import userToken from './tokenGenerator';
import userValidation from './userValidation';

class newUser {
  static newU(req) {
    const newUsr = userValidation.validate({
      token: userToken.createToken(req.body.email),
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      departement: req.body.departement,
      address: req.body.address,
      isAdmin: 'false',
    });
    return newUsr;
  }
}

export default newUser;
