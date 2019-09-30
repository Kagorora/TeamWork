import bcrypt from 'bcrypt-nodejs';
import moment from 'moment';
import users from '../models/users';
import userValidation from './userValidation';
import articleValidation from './articleValidation';
import articles from '../models/articles';

class newUser {
  static newU(req) {
    const newUsr = userValidation.validate({
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
      isAdmin: req.body.isAdmin,
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
      tag: 'normal',
    });
    return newArt;
  }
}

export default newUser;
