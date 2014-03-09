/**
 * Created by yichengfeng on 14-3-1.
 */

var models = require('../models');
var Shop = models.Shop;

 function createShop (params,callback) {
 	console.log("begin create shop.");
 	console.log("params:" + JSON.stringify(params));
 	var shop = new Shop(params);	shop.active = false;
	shop.save(callback);
 	console.log("end create shop.");
 };

 function updateShop(params,resp){

 	console.log('updateShop');
 };

 function deleteShop(params,resp) {
 	console.log('delete');
 };

 function getShop (params,callback) {
 	// console.log('in get shop method.');
 	//console.log(params);
 	Shop.findOne({name: params.name}, callback);
 	// console.log('end get shop method.');
 };

module.exports = {
	'POST':createShop,'UPDATE':updateShop,'DELETE':deleteShop,'GET':getShop
};
