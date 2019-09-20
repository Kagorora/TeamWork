/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const writeBtn = document.querySelector('#writeBtn');
const createArcticleForm = document.querySelector('.createArcticleForm');
const flyer = document.querySelector('#flyer');
const cancel = document.querySelector('.cancel');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const techBtn = document.querySelector('#techBtn');
const socialBtn = document.querySelector('#socialBtn');
const entertaimnent = document.querySelector('#entertaimnent');
const sort = document.querySelector('.sort');
const drop = document.querySelector('#drop');
const logoSide = document.querySelector('.logoSide');
const content = document.querySelector('.content');
const goBack = document.querySelector('.goBack');
const more = document.querySelectorAll('.more');
const fullArticle = document.querySelector('.fullArticle');
const LogOutBtn = document.querySelector('#LogOutBtn');
const user = document.querySelector('.user');
const dropLogOut = document.querySelector('#drop_LogOut');
const myArticle = document.querySelector('.myArticle');
const MyOne = document.querySelector('.MyOne');
const editIcon = document.querySelector('.editIcon');
const EditArcticleForm = document.querySelector('.EditArcticleForm');
const cancelMyarticle = document.querySelector('.cancel_Myarticle');
// const deleteIcon = document.querySelector('.deleteIcon');
const warningDelete = document.querySelector('.warningDelete');

// deleteIcon.addEventListener('click', DisplayWarning);
// function DisplayWarning() {
//   warningDelete.style.display = 'block';
// }

cancelMyarticle.addEventListener('click', closeEditMyArticleForm);
function closeEditMyArticleForm() {
  MyOne.style.display = 'block';
  EditArcticleForm.style.display = 'none';
  createArcticleForm.style.display = 'none';
  one.style.display = 'none';
  two.style.display = 'none';
  three.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'none';
  drop.style.display = 'none';
  dropLogOut.style.display = 'none';
  fullArticle.style.display = 'none';
}



// editIcon.addEventListener('click', displayEditMyArticleForm);
function displayEditMyArticleForm() {
  EditArcticleForm.style.display = 'block';
  createArcticleForm.style.display = 'none';
  one.style.display = 'none';
  two.style.display = 'none';
  three.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'none';
  drop.style.display = 'none';
  dropLogOut.style.display = 'none';
  MyOne.style.display = 'none';
  fullArticle.style.display = 'none';
}

writeBtn.addEventListener('click', displayCreateArticleForm);
flyer.addEventListener('click', displayCreateArticleForm);

function displayCreateArticleForm() {
  createArcticleForm.style.display = 'block';
  one.style.display = 'none';
  two.style.display = 'none';
  three.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'none';
  drop.style.display = 'none';
  dropLogOut.style.display = 'none';
  MyOne.style.display = 'none';
  fullArticle.style.display = 'none';
}

myArticle.addEventListener('click', displayMyArticles);
function displayMyArticles() {
  MyOne.style.display = 'block';
  one.style.display = 'none';
  three.style.display = 'none';
  two.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'none';
  drop.style.display = 'none';
  dropLogOut.style.display = 'none';
  createArcticleForm.style.display = 'none';
  fullArticle.style.display = 'none';
}

cancel.addEventListener('click', closeCreateArticleForm);

function closeCreateArticleForm() {
  createArcticleForm.style.display = 'none';
  one.style.display = 'block';
  two.style.display = 'block';
  three.style.display = 'block';
  four.style.display = 'block';
  five.style.display = 'block';
  fullArticle.style.display = 'none';
}

techBtn.addEventListener('click', openTechArticle);

function openTechArticle() {
  createArcticleForm.style.display = 'none';
  one.style.display = 'block';
  two.style.display = 'none';
  three.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'none';
  drop.style.display = 'none';
  fullArticle.style.display = 'none';
}

socialBtn.addEventListener('click', openSocialArticle);

function openSocialArticle() {
  createArcticleForm.style.display = 'none';
  one.style.display = 'none';
  two.style.display = 'block';
  three.style.display = 'block';
  four.style.display = 'none';
  five.style.display = 'none';
  drop.style.display = 'none';
  fullArticle.style.display = 'none';
}

entertaimnent.addEventListener('click', openEntertainment);

function openEntertainment() {
  createArcticleForm.style.display = 'none';
  one.style.display = 'none';
  two.style.display = 'none';
  three.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'block';
  drop.style.display = 'none';
  fullArticle.style.display = 'none';
}

sort.addEventListener('click', dropdown);

function dropdown() {
  drop.style.display = 'block';
  dropLogOut.style.display = 'none';
}

logoSide.addEventListener('click', clear);

function clear() {
  createArcticleForm.style.display = 'none';
  one.style.display = 'block';
  two.style.display = 'block';
  three.style.display = 'block';
  four.style.display = 'block';
  five.style.display = 'block';
  drop.style.display = 'none';
  dropLogOut.style.display = 'none';
  MyOne.style.display = 'none';
  fullArticle.style.display = 'none';
}

content.addEventListener('click', cleanEverything);

function cleanEverything() {
  drop.style.display = 'none';
}

goBack.addEventListener('click', backToMain);

function backToMain() {
  fullArticle.style.display = 'none';
  createArcticleForm.style.display = 'none';
  one.style.display = 'block';
  two.style.display = 'block';
  three.style.display = 'block';
  four.style.display = 'block';
  five.style.display = 'block';
  myArticle.style.display = 'none';
  dropLogOut.style.display = 'none';
  drop.style.display = 'none';
}

one.addEventListener('click', OpenDetails);

for (mr of more) {
  mr.addEventListener('click', OpenDetails);
}

function OpenDetails() {
  one.style.display = 'none';
  two.style.display = 'none';
  three.style.display = 'none';
  four.style.display = 'none';
  five.style.display = 'none';
  createArcticleForm.style.display = 'none';
  fullArticle.style.display = 'block';
}

user.addEventListener('click', openLogOutDropdown);
function openLogOutDropdown() {
  dropLogOut.style.display = 'block';
  drop.style.display = 'none';
}

LogOutBtn.addEventListener('click', logOut);

function logOut() {
  window.location = '../../index.html';
}
