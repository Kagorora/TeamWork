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
} from './data';

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('article tests', () => {
  it('should be able to create new article', (done) => {
    chai.request(server)
      .post('/api/v1/articles/')
      .set('token', userToken)
      .send(newArticle)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
