/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
const containersignup = document.querySelector('.container-signup');
const logincontainer = document.querySelector('.login-container');
const signupBtn = document.querySelector('#signupBtn');
const loginBtn = document.querySelector('#loginBtn');
const gotologinBtn = document.querySelector('.gotologinBtn');
const createacct = document.querySelector('.createacct');
const logoSide = document.querySelector('.logoSide');
const container = document.querySelector('.container');

createacct.addEventListener('click', displaySignUp);
signupBtn.addEventListener('click', displaySignUp);

function displaySignUp() {
  containersignup.style.display = 'block';
  container.style.display = 'none';
  logincontainer.style.display = 'none';
}

gotologinBtn.addEventListener('click', displayLogin);
loginBtn.addEventListener('click', displayLogin);

function displayLogin() {
  logincontainer.style.display = 'block';
  containersignup.style.display = 'none';
  container.style.display = 'none';
}

function validate() {
  const username = document.getElementById('usernameField').value;
  const password = document.getElementById('passwordField').value;
  if (username == 'employee' && password == 'employee') {
    window.location = './employee.html';
    return false;
  } if (username == 'admin' && password == 'admin') {
    window.location = './admin.html';
    return false;
  }
}

logoSide.addEventListener('click', cleanLanding);

function cleanLanding() {
  logincontainer.style.display = 'none';
  containersignup.style.display = 'none';
  container.style.display = 'block';
}
