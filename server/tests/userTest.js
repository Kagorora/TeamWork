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
  isAdmin: false,
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
  isAdmin: false,
  departement: 'IT',
};

const message = `Teamwork is an internal social network for organizations’ employees. ${''}
The goal of this application is to facilitate more interaction between
${''} colleagues and facilitate team bonding.`;

const signedUser = {
  email: 'kagororaxll@gmail.com',
  password: 'Niyonkuru@1',
};

const NonsignedUser = {
  email: 'blaise@gmail.com',
  password: 'Niyonkuru@1',
};

const wrongData = {
  email: 'kagororaxll@gmail.com',
  password: 'xxx',
};


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

  it('should be able to login', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(signedUser)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should be not able to login when user not found', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(NonsignedUser)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
      });
    done();
  });

  it('should not be able to login when user not found', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(wrongData)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
      });
    done();
  });
});
