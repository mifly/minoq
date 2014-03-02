/**
 * Created by yichengfeng on 14-3-1.
 */
 var MongoClient = require('mongodb').MongoClient;

 function createShop (params,resp) {
 	// TODO:
 	console.log('createShop');
 	MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;

    var collection = db.collection('shops');
    collection.insert(params, function(err, docs) {
    	resp.writeHead(200, {"Content-Type": "application/json"});
	 	resp.write("{");
	 	console.log(docs);
	    resp.write("id:docs['_id'],name:'create shop success!'");
	    resp.end("}");
    });
  });
 };

 function updateShop(req,resp){

 	console.log('updateShop');
 };
 function deleteShop(req,resp) {
 	console.log('delete');
 };
 function getShop (params,resp) {
 	console.log('in get shop method.');
 	resp.writeHead(200, {"Content-Type": "application/json"});
 	resp.write("{");
    resp.write("id:1,name:'shop test1',domainname:'hostname1.com'");
    resp.end("}");
 };

module.exports = {
	'POST':createShop,'UPDATE':updateShop,'DELETE':deleteShop,'GET':getShop
};