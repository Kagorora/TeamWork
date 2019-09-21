/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';

chai.use(chaiHttp);
chai.should();

const newUser = {
  email: 'kagororaxll@gmail.com',
  lastName: 'max',
  password: 'Niyonkuru@1',
  gender: 'male',
  jobRole: 'System Administrator',
  firstName: 'macll',
  address: 'KN12',
  isAdmin: true,
  departement: 'IT',
};

const wrongUser = {
  firstName: 'macll123456',
  email: 'kagororaxll@gmail.com',
  lastName: 'max1111',
  password: 'Niyonkuru@1',
  gender: 'male',
  jobRole: 'System Administrator',
  address: 'KN12',
  isAdmin: true,
  departement: 'IT',
};

const message = `Teamwork is an internal social network for organizations’ employees. ${''}
The goal of this application is to facilitate more interaction between
${''} colleagues and facilitate team bonding.`;

describe('User tests', () => {
  it('should be able to welcome', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal(message);
      });
    done();
  });


  it('should be able to signup', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.message.should.be.equal('User created successfully');
      });
    done();
  });

  it('should not be able to signup for duplicate', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Email already exist');
      });
    done();
  });

  it('should not be able to signup for wrong or empty input', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(wrongUser)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
