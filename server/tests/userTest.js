/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';
import {
  newUser, missingFirstName, missinglastName,
} from './data';

chai.use(chaiHttp);
chai.should();

describe('User tests', () => {
  it('Should be able to signup', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(201);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should not be able to signup for duplicate', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(409);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should not be able to signup for invalid FirstName', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(missingFirstName)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });

  it('Should not be able to signup for invalid inputs lastName', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(missinglastName)
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(400);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });
});
