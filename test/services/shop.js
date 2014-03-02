var app = require('../../app');
var Httpclient = require('../../common/httpclient');
describe('shop.js', function(){
	var port = 8081;
	var httpClient;

	before(function (done) {
		app.listen(port, done);
		httpClient = new Httpclient({'port':port});
	});

	after(function () {
		app.close();
	});

	it('get /shop should status 200', function (done) {

		httpClient.get('/shop',null, function(res){
			res.should.status(200);
	      	done();
		});
	});

	it('create shop should ok', function(done){
		httpClient.post('/shop',{name:'miflyking',cre:new Date()},function(res){
			res.should.status(200);
			done();
		});
	});

});