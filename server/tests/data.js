import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokenG from '../helpers/tokenGenerator';

dotenv.config();
const newUser = {
  firstName: 'kagorora',
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  jRole: 'mentor',
  address: 'KN12',
  department: 'IT',
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
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  jRole: 'mentor',
  address: 'KN12',
  department: 'IT',
};

const missingPassword = {
  firstName: 'kagorora',
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  gender: 'male',
  jRole: 'mentor',
  address: 'KN12',
  department: 'IT',
};

const shortPassword = {
  firstName: 'kagorora',
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  password: 'Ni',
  gender: 'male',
  jRole: 'mentor',
  address: 'KN12',
  department: 'IT',
};

const invalidJobRole = {
  firstName: 'kagorora',
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  address: 'KN12',
  department: 'IT',
};

const invalidAddress = {
  firstName: 'kagorora',
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  jRole: 'mentor',
  department: 'IT',
};

const invalidDepartment = {
  firstName: 'kagorora',
  lastName: 'maxime',
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  jRole: 'mentor',
  address: 'KN12',
};

const missinglastName = {
  firstName: 'kagorora',
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
  gender: 'male',
  jRole: 'mentor',
  address: 'KN12',
  department: 'IT',
};

// const message = `Teamwork is an internal social network for organizations’ employees. ${''}
// The goal of this application is to facilitate more interaction between
// ${''} colleagues and facilitate team bonding.`;

const signedUser = {
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru@1',
};

const NonsignedUser = {
  email: 'max@gmail.com',
  password: 'Niyonkuru@1',
};

const wrongData = {
  email: 'kagororamaxime@gmail.com',
  password: 'Niyonkuru1',
};

const invalidEmail = {
  email: 'kagororamaximegmail.com',
  password: 'Niyonkuru@1',
};

const userToken = tokenG.createToken(1, newUser.email, newUser.isAdmin);

const newArticle = {
  title: 'How to maka cake',
  article: 'An application’s',
  category: 'Technology',
  tag: 'normal',
  userId: newUser.id,
};

const ArticleInvalidCategory = {
  title: 'How to maka cake',
  article: 'An application’s',
  category: 'invalid',
  tag: 'normal',
  userId: newUser.id,
};

const updatedArticle = {
  title: 'hello',
  article: 'there',
  category: 'Social',
  tag: 'normal',
  userId: newUser.id,
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

const wrongComment = {
  id: 1,
  title: newArticle.title,
  article: newArticle.article,
  category: 'normal',
  ftag: 'normal',
  userId: 1,
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
  wrongComment,
  invalidComment,
  invalidEditArticle,
  adminToken,
  missingPassword,
  invalidJobRole,
  invalidAddress,
  invalidDepartment,
  shortPassword,
  ArticleInvalidCategory,
};
