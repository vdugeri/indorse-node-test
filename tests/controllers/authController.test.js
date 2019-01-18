const should = require('should');
const httpMocks = require('node-mocks-http');
const models = require('../../src/models');
const controllers = require('../../src/controllers');

let res, mockUser;


describe('AuthController', () => {
  mockUser = {
    first_name: 'Joey',
    last_name: 'Dodley',
    email_address: 'joey.dodley@example.com',
    password: 'password'
  };
  beforeEach(done => {
    res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });

    models.sequelize.sync({ force: true }).then(() => {
      models.User.create(mockUser).then(user => {
        done();
      });
    });
  });

  afterEach(done => {
    models.sequelize.sync({ force: true }).then(() => done());
  });

  describe('user login', () => {
    it('log in should fail for invalid creds', done => {
      const req = httpMocks.createRequest({
        body: {
          email_address: mockUser.email_address,
          password: 'wrongpassword'
        }
      });
      controllers.AuthController.login(req, res);
      res.on('end', () => {
        const data = JSON.parse(res._getData());
        data.status.should.equal('error');
        data.message.should.equal('Invalid credentials');
        done();
      });
    });

    it('should login in a user', done => {
      const req = httpMocks.createRequest({
        body: {
          email_address: mockUser.email_address,
          password: mockUser.password
        }
      });

      controllers.AuthController.login(req, res);
      res.on('end', () => {
        const data = JSON.parse(res._getData());
        data.should.not.be.empty();
        data.should.be.an.instanceOf(Object).and.have.property('token').which.is.a.String();
        done();
      });
    });
  });
})
