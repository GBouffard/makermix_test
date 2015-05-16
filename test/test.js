var request = require ('supertest'),
    express = require('express'),
    mongoose = require('mongoose'),
    should = require('chai').should(),
    expect = require('chai').expect;


process.env.NODE_ENV = 'test'
var app = require('../app');

after(function(done) {
  mongoose.connection.close();
  process.exit()
  done();
});

describe('GET', function(){

  before(function(done) {
    request(app)
    .post('/makers')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({'name': "whatever", 'pair': "true", 'blacklist': 'true'})
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err,res) {
      done();
      });
    });

  it('responds with a list of todo items in JSON', function(done){
    request(app)
    .get('/makers')
    .set('Accept', 'application/x-www-form-urlencoded')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err,res) {
      console.log(res.body[0].name);
      expect(res.body[0].name).to.equal("whatever");
      done();
    });
  });
});

describe('DELETE', function() {

  before(function(done) {
    request(app)
    .post('/makers')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({'name': "whatever", 'status': 'false', 'blacklist': 'true'})
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err,res) {
      maker = res.body
      done();
    });
  });

  it('responds with a json success message', function(done) {
    request(app)
    .del('/makers/' + maker._id)
    .expect(200, done)
  });
});

describe('POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .post('/makers')
    .set('Accept', 'application/x-www-form-urlencoded')
    .expect('Content-Type', /json/)
    .send({'name': 'Guillaume', 'status': 'false', 'blacklist': 'false'})
    .expect(200, done);
  });
});
