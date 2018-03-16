const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const server = require('../src/lib/server');

describe('server', () => {

  after(() => { server.close(); });

  describe('GET /sudoku/board', () => {

    it('should respond in under 500ms', () => {
      const time = process.hrtime();
      chai.request(server)
        .get('/sudoku/board')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          const diff = process.hrtime(time);
          const ms = diff[1] / 1e6;
          expect(ms).to.be.below(500);
        });
    });

    it('should respond with status 200', () => {
      chai.request(server)
        .get('/sudoku/board')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
    });

  });

});

