/* eslint-disable no-unused-vars */
import users from '../models/users';

class search {
  static searchUser(email) {
    const searchUser = users.find(usr => usr.email === email);
    return searchUser;
  }
}

export default search;
