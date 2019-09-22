/* eslint-disable no-unused-vars */
import users from '../models/users';
import articles from '../models/articles';

class search {
  static searchUser(email) {
    const searchUser = users.find(usr => usr.email === email);
    return searchUser;
  }

  static searchArt(title) {
    const findArticle = articles.find(a => a.title === title);
    return findArticle;
  }

  static searchArtById(id) {
    const findArticle = articles.find(a => a.id === id);
    return findArticle;
  }

  static searchByCategory(category) {
    const findArticle = articles.filter(a => a.category === category);
    return findArticle;
  }
}

export default search;
