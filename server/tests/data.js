import uuid from 'uuid';
import tokenG from '../helpers/tokenGenerator';

const newUser = {
  firstName: 'maxime',
  lastName: 'alain',
  email: 'kkx@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  isAdmin: true,
};

const wrongUser = {
  firstName: 'maxime',
  lastName: 'alain',
  email: 'kkxgmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  isAdmin: true,
};

const missingFirstName = {
  lastName: 'alain',
  email: 'kkx@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  isAdmin: true,
};

const missinglastName = {
  firstName: 'maxime',
  email: 'kkx@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  isAdmin: true,
};

const userToken = tokenG.createToken(
  newUser.id,
  newUser.email,
  newUser.isAdmin,
);

// const message = `Teamwork is an internal social network for organizations’ employees. ${''}
// The goal of this application is to facilitate more interaction between
// ${''} colleagues and facilitate team bonding.`;

const signedUser = {
  email: 'kkx@gmail.com',
  password: 'Niyonkuru@1',
};

const NonsignedUser = {
  email: 'non@gmail.com',
  password: 'Niyonkuru@1',
};

const wrongData = {
  email: 'kkx@gmail.com',
  password: 'wrong',
};

const invalidEmail = {
  email: 'kagororamaximegmail.com',
  password: 'wrong',
};

const newArticle = {
  id: uuid(),
  title: 'How to maka cake',
  article: 'An application’s',
  category: 'Technology',
  tag: 'normal',
};

const updatedArticle = {
  title: 'ttttttttt',
  article: 'updated',
  category: 'Social',
};

const wrongArticle = {
  id: 1,
  title: 'hello',
  tag: 'normal',
};

const invalidEditArticle = {
  article: 'An application’s',
};

const newArticle2 = {
  title: 'hello',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  category: 'tech',
  tag: 'normal',
};

const newComment = {
  createdOn: '2019-09-17',
  commentId: 1,
  articleTitle: 'hbljhbj',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  comment: 'thanks',
  tag: 'normal',
};

const invalidComment = {
  createdOn: '2019-09-17',
  commentId: 1,
  articleTitle: 'hbljhbj',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  comment: 55555555,
  tag: 'normal',
};

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrYWdvcm9yYW1heGltZW1hQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU2OTI4MTg1OH0.kDIL6WByXGfNEW2aukkxfz56DRtIZ7T9chlVpjfqRa4';

export {
  newUser,
  wrongUser,
  missingFirstName,
  missinglastName,
  userToken,
  // message,
  signedUser,
  NonsignedUser,
  wrongData,
  invalidEmail,
  newArticle,
  wrongArticle,
  updatedArticle,
  newArticle2,
  newComment,
  invalidComment,
  invalidEditArticle,
  adminToken,
};
