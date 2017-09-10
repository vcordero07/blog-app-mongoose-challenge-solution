const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {
  BlogPost
} = require('../models');

const {
  app,
  runServer,
  closeServer
} = require('../server');

chai.use(chaiHttp);

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Blog App API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {});

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })

  describe('DELETE endpoint', function() {
    it('delete a BlogPost by id', function() {

      let post;

      return BlogPost
        .findOne()
        .then(function(_post) {
          post = _post;
          return chai.request(app).delete(`/posts/${post.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return BlogPost.findById(post.id);
        })
        .then(function(_post) {
          should.not.exist(_post);
        });
    });
  });
})
