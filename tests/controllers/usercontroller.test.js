
const should = require('should');
const httpMocks = require('node-mocks-http');
const models = require('../../src/models');
const controllers = require('../../src/controllers');
const Mailer = require('../../src/utils/emailUtils');
const sinon = require('sinon');

let res, mockUser;



describe('UserController', () => {
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

    models.sequelize.sync({ force: true }).then(() => done());
  });

  afterEach(done => {
    models.sequelize.sync({ force: true }).then(() => done());
  });

  describe('Create user', () => {
    it('should create a new user', done => {
      let req = httpMocks.createRequest({
        body: mockUser
      });
      const mockInfo = {
        id: 'testid',
        url: 'mockurl'
      };

      const mockMailer = sinon.stub(Mailer, 'sendConfirmationEmail');
      mockMailer.callsFake(async () => {
        return mockInfo;
      });

      controllers.UserController.create(req, res);

      res.on('end', () => {
        const data = JSON.parse(res._getData());
        data.should.not.be.empty();
        data.should.be.an.instanceOf(Object).and.have.property('info').which.is.a.String();
        mockMailer.reset();
        done();
      });
    });
  });
});

