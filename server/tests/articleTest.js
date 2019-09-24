/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';

chai.use(chaiHttp);
chai.should();

const newArticle = {
  title: 'hello',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  category: 'tech',
  tag: 'normal',
};

const newArticle2 = {
  title: 'hello2',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  category: 'tech',
  tag: 'normal',
};

const wrongArticle = {
  id: 1,
  title: 'hello',
  tag: 'normal',
};

const updatedArticle = {
  title: 'Rwanda',
  article: 'lorem ispum',
  category: 'tech',
  tag: 'normal',
};

const newComment = {
  createdOn: '2019-09-17',
  commentId: 1,
  articleTitle: 'hbljhbj',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  comment: 'alcnskkkkkkkkkkkacsk a csh cs',
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
const correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrYWdvcm9yYW1heGltZW1hQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NjkyODE2NDR9.JaXtPrfpCGqEtp9jMZUJ6Dmg5n2zMDHMpLUQz-dinPw';
const wrongToken = 'thisIsAWrongToken';

describe('article tests', () => {
  //= ===================================== create article ==============================
  it('should be able to create new article', (done) => {
    chai.request(server)
      .post('/api/v1/createArticle')
      .send(newArticle)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });

  it('should not be able to create new article for duplicate', (done) => {
    chai.request(server)
      .post('/api/v1/createArticle')
      .send(newArticle)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });

  it('should not be able to create new article for wrong inputs', (done) => {
    chai.request(server)
      .post('/api/v1/createArticle')
      .send(wrongArticle)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });

  it('should not be able to create new article for wrong token', (done) => {
    chai.request(server)
      .post('/api/v1/createArticle')
      .send(newArticle)
      .set('token', wrongToken)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Authentication failed');
      });
    done();
  });
  //= =============================== search article ================================
  it('should not be able to search article', (done) => {
    chai.request(server)
      .get('/api/v1/article/1000000')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  it('should be able to search article', (done) => {
    chai.request(server)
      .get('/api/v1/article/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  // ================================== search By Category ==========================

  it('should not be able to search article when category does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/articles/ttt')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  it('should be able to search article', (done) => {
    chai.request(server)
      .get('/api/v1/articles/tech')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  // ================================ edit article =================================
  it('should be able to edit article', (done) => {
    chai.request(server)
      .patch('/api/v1/article/1')
      .send(updatedArticle)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able to edit article when nothing changed', (done) => {
    chai.request(server)
      .patch('/api/v1/article/1')
      .send(updatedArticle)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });

  it('should not be able to edit article for non found article', (done) => {
    chai.request(server)
      .patch('/api/v1/article/9999')
      .send(updatedArticle)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  //  =============================== view all articles ============================
  it('should be able to view all articles ', (done) => {
    chai.request(server)
      .get('/api/v1/article')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  // =============================== not delete article marked not  inappropiate ================
  it('should not be able to delete articles marked as inapropiate when not found ', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('article is normal');
      });
    done();
  });

  // ================================ mark article as inapropriate ==========================

  it('should be able to mark as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should be able to mark as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/99999')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  // ================================ not delete marked articles as inappropriate ===============

  it('should not be able to delete articles marked as inapropiate when not admin ', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Only admin has access');
      });
    done();
  });

  it('should not be able to delete articles marked as inapropiate when not found ', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/99999')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('article not found');
      });
    done();
  });

  //  =============================== comment on article ============================
  it('should be able to comment articles ', (done) => {
    chai.request(server)
      .post('/api/v1/articles/1/comments')
      .send(newComment)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });

  it('should not be able to comment articles for nonfound articles ', (done) => {
    chai.request(server)
      .post('/api/v1/articles/9999/comments')
      .send(newComment)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  it('should not be able to comment articles for invalid comment ', (done) => {
    chai.request(server)
      .post('/api/v1/articles/1/comments')
      .send(invalidComment)
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });

  it('should not be able to delete comment when not marked', (done) => {
    chai.request(server)
      .delete('/api/v1/commente/flaged/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('article is normal');
      });
    done();
  });

  // ================================ mark comment as inapropriate ==========================

  it('should be able to mark comments as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/comments/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able to mark as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/comments/9999')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  // ============================== delete articles when marked as inapropiate

  it('should be able to delete articles when marked as inapropiate', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to delete unfound article', (done) => {
    chai.request(server)
      .delete('/api/v1/article/10')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });
  //  =============================== view all articles ============================
  it('should not be able to view all articles ', (done) => {
    chai.request(server)
      .get('/api/v1/article')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('no article found');
      });
    done();
  });

  //= ===================================== delete marked comment ==============================
  it('should be able to create new article', (done) => {
    chai.request(server)
      .post('/api/v1/createArticle')
      .send(newArticle2)
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });

  it('should be able to comment articles ', (done) => {
    chai.request(server)
      .post('/api/v1/articles/1/comments')
      .send(newComment)
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });
  it('should be able to mark comments as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/comments/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able to delete comment when not found', (done) => {
    chai.request(server)
      .delete('/api/v1/commente/flaged/9999')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('comments not found');
      });
    done();
  });

  it('should not be able to delete comment when not found', (done) => {
    chai.request(server)
      .delete('/api/v1/commente/flaged/9999')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Only admin has access');
      });
    done();
  });

  it('should be able to delete comment', (done) => {
    chai.request(server)
      .delete('/api/v1/commente/flaged/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('article successfully deleted');
      });
    done();
  });

  // ============================= delete ordinary article==================
  it('should be able to create new article', (done) => {
    chai.request(server)
      .post('/api/v1/createArticle')
      .send(newArticle)
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });

  it('should be delete to articles ', (done) => {
    chai.request(server)
      .delete('/api/v1/article/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('article successfully deleted');
      });
    done();
  });
});
