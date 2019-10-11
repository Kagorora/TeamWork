/* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';
import {
  newArticle,
  userToken,
  updatedArticle,
  wrongArticle,
  newUser,
  Comment,
  wrongComment,
  ArticleInvalidCategory,
} from './data';

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('article tests', () => {
  it('Should be able to create new article', (done) => {
    chai.request(server)
      .post('/api/v1/articles/')
      .set('token', userToken)
      .send(newArticle)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should not be able to create new article for invalid category', (done) => {
    chai.request(server)
      .post('/api/v1/articles/')
      .set('token', userToken)
      .send(ArticleInvalidCategory)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should not be able to create duplicate article', (done) => {
    chai.request(server)
      .post('/api/v1/articles/')
      .set('token', userToken)
      .send(newArticle)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
  
  it('Should be able to edit new article', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1000')
      .set('token', userToken)
      .send(updatedArticle)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Should be able to view all articles', (done) => {
    chai.request(server)
      .get('/api/v1/articles/feeds')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('Should not be able to comment on articles for invalid comment', (done) => {
    chai.request(server)
      .post('/api/v1/articles/1/comments')
      .set('token', userToken)
      .send(wrongComment)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('Should be able to edit new article', (done) => {
    chai.request(server)
      .delete('/api/v1/articles/1')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('Should be able to edit new article', (done) => {
    chai.request(server)
      .delete('/api/v1/articles/1')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Should be able to edit new article', (done) => {
    chai.request(server)
      .get('/api/v1/articles/feeds')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  // // it('Should be able to edit new article', (done) => {
  // //   chai.request(server)
  // //     .patch('/api/v1/article/1')
  // //     .set('token', userToken)
  // //     .send(newArticle)
  // //     .end((err, res) => {
  // //       res.should.have.status(200);
  // //       done();
  // //     });
  // // });
});
