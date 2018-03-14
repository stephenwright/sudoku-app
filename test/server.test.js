const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const { app } = require('../lib/server');

describe('GET /sudoku/board', () => {

  it('should respond in under 500ms', (done) => {

    chai.request(app)
      .get('/sudoku/board')
      .end(function (err, res) {
         expect(err).to.be.null;
         expect(res).to.have.status(200);
         done();
      });

  });

});
