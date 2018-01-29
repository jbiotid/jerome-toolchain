var request = require('request'),
assert = require('assert'),
base_url = 'http://localhost:8080/'


var mocha = require('mocha');
module.exports = MyReporter;

function MyReporter(runner) {
  mocha.reporters.Base.call(this, runner);
  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
    passes++;
    console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
  });

  runner.on('end', function(){
    console.log('end: %d/%d', passes, passes + failures);
    process.exit(failures);
  });
}

describe('Hello World Server', function() {
	describe('GET /', function() {
		it('returns status code 400', function(done) {
			request.get(base_url, function(error, response, body) {
				//expect(response.statusCode).toBe(200);
				assert.equal(400, response.statusCode)
				done()
			})
		})
	})
})
