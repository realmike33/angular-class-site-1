let request = require('supertest');
let _ = require('lodash');
let moment = require('moment');

let fakeAuthor = {
  email: "test@gmail.com",
  password: "123password",
  role: "author",
  displayname: "fake author"
}


describe('Posts'.underline.blue, () =>{
  let router;
  let app;
  let token;
  let dbPosts = [];

  before(() =>{
    return System.import('api/author/routes')
    .then(module =>{
      router = module.postRouter;
    })
  });

  before(() =>{
    return System.import('server')
    .then(module =>{
      app = module.app;
    });
  });

// seed the db
before(() =>{
  return System.import('config/seed')
    .then( seed =>{
    return seed.default();
});
});

before(done =>{
  request(app)
    .post('/api/v1/author/login')
    .send({ email: 'scott@angularclass.com', password: 'ballin35$$' })
    .expect(200)
    .end((err, res) =>{
      if (err) {
        return done(err);
      }
      token = res.body.token;
      done();
    });
  });

  it('should GET all authors', done =>{
    request(app)
      .get('/api/v1/author')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let authors = res.body;
        authors.forEach(author =>{
          expect(author).be.ok;
        });
        done();
      });
    });

  it('should create a new author', done => {
    request(app)
    .post('/api/v1/author')
    .set('Authorization', 'Bearer '+ token)
    .send(fakeAuthor)
    .expect(200)
    .end((err, res) =>{
      if(err){
        return done(err);
      }
      let author = res.body;
      expect(author).to.be.ok;
    })
  })
});

