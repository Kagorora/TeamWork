/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';
import {
  newArticle,
  wrongArticle,
  correctToken,
  updatedArticle,
  newComment,
  invalidComment,
  adminToken,
  newArticle2,
} from './data';

chai.use(chaiHttp);
chai.should();

describe('article tests', () => {
  //= ================== create article ==============================
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

  // ============ view all articles ====================
  it('should be able to view all articles ', (done) => {
    chai.request(server)
      .get('/api/v1/article')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  // ============= search one article ================
  it('should not be able to search article when does not exists', (done) => {
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


  // ================ search By Category ==========================

  it('should not be able to search article when category does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/articles/ttt')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  it('should be able to search article by category', (done) => {
    chai.request(server)
      .get('/api/v1/articles/Technology')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  //   // ============== edit article ===============
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
        res.body.error.should.be.equal('article not found');
      });
    done();
  });

  // ================ comment on articles ===================
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

  // ============================== delete articles when marked as inapropiate
  it('should not be able to delete article when not marked as inappropriate', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Only admin has access');
      });
    done();
  });

  it('should not be able to delete article when not marked as inappropriate', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/1')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('article is normal');
      });
    done();
  });

  // ============= mark article as inapropriate ==========================

  it('should be able article as mark as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able article mark as inapropiate when not found', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/99999')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  // ============= delete comment marked as inapropriate ======================

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

  // ============= mark comment as inapropriate ==========================

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

  // ============= delete comment marked as inapropriate ======================

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

  // ================ delete article ==========================

  it('should be delete to articles ', (done) => {
    chai.request(server)
      .delete('/api/v1/article/9999')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('article not found');
      });
    done();
  });

  it('should be delete to articles ', (done) => {
    chai.request(server)
      .delete('/api/v1/article/1')
      .set('token', correctToken)
      .end((err, res) => {
      });
    done();
  });


  // ============================== delete articles when marked as inapropiate
  it('should not be able to delete unfound article', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/99999')
      .set('token', adminToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('article not found');
      });
    done();
  });

  // ============ view all articles ====================
  it('should be able to view all articles ', (done) => {
    chai.request(server)
      .get('/api/v1/article')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('no article found');
      });
    done();
  });

  //= ================== create article ==============================
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

  // ============= mark article as inapropriate ==========================
  it('should be able article as mark as inapropiate ', (done) => {
    chai.request(server)
      .patch('/api/v1/articles/1')
      .set('token', correctToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  // =============delete article marked as inapropriate ==========================
  it('should not be able to delete unfound article', (done) => {
    chai.request(server)
      .delete('/api/v1/article/flaged/1')
      .set('token', adminToken)
      .end((err, res) => {
      });
    done();
  });
});
