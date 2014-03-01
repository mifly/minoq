/**
 * Created by yichengfeng on 14-3-1.
 */
 function createShop (req,resp) {
 	// TODO:
 	console.log('createShop');
 };
 function updateShop(req,resp){

 	console.log('updateShop');
 };
 function deleteShop(req,resp) {
 	console.log('delete');
 };
 function getShop (req,resp) {
 	resp.writeHead(200, {"Content-Type": "application/json"});
 	resp.write("{");
    resp.write("id:1,name:'shop test1',domainname:'hostname1.com'");
    resp.end("}");
 };

module.exports = function(req,resp){

	switch(req.method){
		case 'POST':
			createShop(req,resp);
			break;
		case 'PUT':
			updateShop(req,resp);
			break;
		case 'DELETE':
			deleteShop(req,resp);
			break;
		default:
			getShop(req,resp);
	}
};