var request = require ('supertest'),
    express = require('express'),
    mongoose = require('mongoose');


process.env.NODE_ENV = 'test'
var app = require('../app');

beforeEach(function(done) {
  mongoose.connection.db.dropDatabase(done);
});

after(function(done) {
  mongoose.connection.close();
  process.exit()
  done();
})

describe('POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .post('/makers')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({'name': 'first_item', 'status': 'false'})
    .expect(200, done);
  });
});