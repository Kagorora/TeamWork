import bcrypt from 'bcrypt-nodejs';
import moment from 'moment';
import users from '../models/users';
import userToken from './tokenGenerator';
import userValidation from './userValidation';
import articleValidation from './articleValidation';
import articles from '../models/articles';

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

  static newA(req) {
    const newArt = articleValidation.validate({
      id: articles.length + 1,
      title: req.body.title,
      article: req.body.article,
      createdOn: moment().format('YYYY-MM-DD'),
      category: req.body.category,
    });
    return newArt;
  }
}

export default newUser;
