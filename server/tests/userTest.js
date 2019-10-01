/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../api_server';
import {
  newUser, UserwrongFirstName, UserwrongLastName, UserwrongDepartement,
  UserwrongJobRole, message, signedUser, NonsignedUser, wrongData,
  missingPassword, invalidEmail, invalidPassword,
} from './data';

chai.use(chaiHttp);
chai.should();

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
        res.body.should.be.an('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('password');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('jobRole');
        res.body.data.should.have.property('address');
        res.body.data.should.have.property('isAdmin');
        res.body.data.should.have.property('department');
      });
    done();
  });

  it('should not be able to signup for duplicate', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.body.status.should.be.equal(409);
        res.body.error.should.be.equal('Email already exist');
      });
    done();
  });

  it('should not be able to signup for invalid firstName', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(UserwrongFirstName)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Invalid firstName');
      });
    done();
  });

  it('should not be able to signup for invalid lastName', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(UserwrongLastName)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Invalid lastName');
      });
    done();
  });

  it('should not be able to signup for invalid department', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(UserwrongDepartement)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Invalid department');
      });
    done();
  });

  it('should not be able to signup for invalid jobRole', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(UserwrongJobRole)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Invalid jobRole');
      });
    done();
  });

  it('should not be able to signup for missing Password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(missingPassword)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('password is required');
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

  it('should not be able to login when user enters incorrect password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(wrongData)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('invalid credentials');
      });
    done();
  });

  it('should not be able to login whith an invalidEmail', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(invalidEmail)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });


  it('should not be able to login with an invalidpassword', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(invalidPassword)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
