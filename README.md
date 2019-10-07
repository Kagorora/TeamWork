# TeamWork [![Build Status](https://travis-ci.com/Kagorora/TeamWork.svg?branch=develop)](https://travis-ci.com/Kagorora/TeamWork)  [![Coverage Status](https://coveralls.io/repos/github/Kagorora/TeamWork/badge.svg?branch=develop)](https://coveralls.io/github/Kagorora/TeamWork?branch=develop)

Teamwork is an internal social network for organizations’ employees. The goal of this application is to facilitate more interaction between colleagues and facilitate team bonding.

## FRONT END DEMO 
* Use the following link to view the frontend
https://kagorora.github.io/TeamWork/UI/index.html

### BACKEND
Here is the all routes used in the app:

users

* post '/signup'
* post '/signin'
* post '/'
* patch '/:id'  // editArticle
* delete '/:id' // deleteArticle
* get '/feeds' // viewAllArticles
* get '/:id' // findArticle
* get '/category/:category // viewByCategories
* patch '/:id/flag' // FlagArticle
* delete '/flaged/:id' // RemoveFlagedArticles
* post '/:id/comments'  // createComments
* patch '/:id/flag/comment' // FlagComment
* delete '/:id/flag/comment' // RemoveFlagedComments

#### Tools Used

. Server/backend: NodeJS
. Test: Mocha and Chai
. Style Guides: ESlint, Airbnb

##### HOSTING AND DEPLOYMENT

* HOSTED on HEROKU link: https://dashboard.heroku.com/apps/teamwork2019<br>
* GH for demo: https://kagorora.github.io/TeamWork/UI/index.html

###### DOCUMENTATION

POSTMAN documention https://documenter.getpostman.com/view/6833415/SVtR1Vnp?version=latest

###### Installation

* Install Node js
* Install visual studio code or any sublime , ....
* Install git bash

Clone the project using 

```
git clonhttps://github.com/Kagorora/TeamWork.git
```

start the server <br>

```
npm start
```
 
 run test <br>
 
```
npm run test
```

 


