//httpclient
var http = require('http');
var querystring = require('querystring');

/*
* Recursively merge properties of two objects
*/
function mergeJSON(obj1, obj2) {
    if (obj2) {
        Object.keys(obj2).forEach(function (p) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor === Object) {
                    obj1[p] = mergeJSON(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        });
    }

    return obj1;
}

var Httpclient = function(options){

	var defaultOptions = {
		host:'localhost',
		path:'/',
		method:'GET',

		headers:{
			'Content-Type':'application/json'
		}
	};

	this.allOptions = mergeJSON(defaultOptions,options);
};

Httpclient.prototype.request = function (options, params, callback){

	var contents = '';
	if(params){
		contents = JSON.stringify(params); //JSON.stringify
		this.allOptions.headers['Content-Length'] = contents.length;
	}

	this.allOptions = mergeJSON(this.allOptions,options);
	var req = http.request(this.allOptions,function(resp){
		callback(resp);
	});
	
	req.write(contents);
	req.end();

};

Httpclient.prototype.get = function (path, params, callback){
	this.request({'path':path,'method':'GET'},params,callback);
};

Httpclient.prototype.post = function (path, params, callback){
	this.request({'method':'POST','path':path},params,callback);
};
Httpclient.prototype.update = function (path,params, callback){
	this.request({'method':"PUT"},params,callback);
};
Httpclient.prototype.delete = function (path,params, callback){
	this.request({'method':'DELETE'},params,callback);
};


module.exports = Httpclient;