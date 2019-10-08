// /* eslint-disable no-undef */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../api_server';

// chai.use(chaiHttp);
// chai.should();

// describe('Route Test', () => {
//   it('should not be able to proceed if route is wrong', (done) => {
//     chai.request(server)
//       .post('/api/v1/articles/muu')
//       .end((err, res) => {
//         res.body.status.should.be.equal(404);
//         res.body.message.should.be.equal('Routes Not found');
//       });
//     done();
//   });
// });
