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
};

const wrongArticle = {
  id: 1,
  title: 'hello',
};

const updatedArticle = {
  title: 'Rwanda',
  article: 'lorem ispum',
  category: 'tech',
};

const newComment = {
  createdOn: '2019-09-17',
  commentId: 1,
  articleTitle: 'hbljhbj',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  comment: 'alcnskkkkkkkkkkkacsk a csh cs',
  flag: 'normal',
};

const invalidComment = {
  createdOn: '2019-09-17',
  commentId: 1,
  articleTitle: 'hbljhbj',
  article: 'aaaaaaaaaaaaaaaaaaaaa',
  comment: 55555555,
  flag: 'normal',
};

const correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heGltZUBnbWFpbC5jb20iLCJpYXQiOjE1Njg0NDYzODJ9.K8WOsJtVVk5u5ECCDbiubQanrl3hvUaNjVthUyV41bQ';
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

  //= =============================== delete article ================================
  it('should be able to delete new article', (done) => {
    chai.request(server)
      .delete('/api/v1/article/1')
      .set('token', correctToken)
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
});
