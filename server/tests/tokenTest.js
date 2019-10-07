/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';
import { newArticle } from './data';

chai.use(chaiHttp);

chai.should();

describe('token test', () => {
  const wrongToken = 'thisIsAWrongToken';

  it('should not be able to create new article for wrong token', done => {
    chai
      .request(server)
      .post('/api/v1/articles')
      .send(newArticle)
      .set('token', wrongToken)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Authentication failed');
      });
    done();
  });
});
