var app = require('../../app');
var Httpclient = require('../../common/httpclient');

describe('shop.js', function(){
	var port = 8081;
	before(function (done) {
		app.listen(port, done);
	});
	after(function () {
		app.close();
	});

	it('should /shop status 200', function (done) {

		new Httpclient({'port':port}).get('/shop',null, function(res){
			res.should.status(200);
	      	done();
		});
	    /*http.get({host: 'localhost',path:'/shop',port:8081},function (res) {
	      res.should.status(200);
	      done();
	    });*/
	});

});