var app = require('../../app');
var Httpclient = require('../../common/httpclient');
describe('shop.js', function(){
	var port = 8081;
	var httpClient;

	var shopname;

	before(function (done) {
		app.listen(port, done);
		httpClient = new Httpclient({'port':port});
		shopname = "shop_name4_test_" + Date.now();
	});

	after(function () {
		app.close();
	});


	it('create shop should ok', function(done){
		var name = shopname;
		console.log("name:" + name);
		var email = shopname + "@gmail.com";
		httpClient.post('/shop',{name:name,loginname:name,email:email},function(res){
			//console.log("res status:"+res.status);
			res.should.status(200);
			done();
		});
	});

	it('get /shop should status 200', function (done) {

		httpClient.get('/shop',{name:shopname}, function(res){
			//console.log(res);
			res.should.status(200);
	      	done();
		});
	});

});