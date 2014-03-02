/**
 * Created by yichengfeng on 14-3-1.
 */
 
var http = require('http');
var url = require('url');
var services = require('./services');

// TODO: load site from mongodb
var siteMap = {'localhost':'1','hostname1.com':'2','hostname2.com':'3'};

var resourceNotFoundError = function(req, resp){
    resp.writeHead(500);
    resp.end("Resouce not found!");
};

var route = function(req,resp){
    var pathName = url.parse(req.url).pathname;
    var paths = pathName.split('/');
    var serviceName;
    if (paths.length >= 2) {
        serviceName = paths[1];
        console.log('servicename:' + serviceName);
        console.log('req.body:' + req.body);
        console.log(typeof services[serviceName]);
        if (services[serviceName] && typeof services[serviceName] === 'object') {
            console.log('invoke method:' +req.method);
            console.log(typeof services[serviceName][req.method]);
            services[serviceName][req.method].apply(null,[req.body,resp]);
        }else{
            // TODO: process resource not found error
            return new Error("Not Found!");
        };
        
    };
};

var app = http.createServer(function(req,resp) {

    var hostname = req.headers.host && req.headers.host.split(":")[0];
    var contentType = req.headers['content-type'];
    var siteId = siteMap[hostname];
    if (siteId && 'application/json' === contentType) {
        var _postdata = '';
        req.on('data',function(chunk){
            _postdata += chunk.toString();
        });
        req.on('end',function(){
            if(_postdata)
                req.body = JSON.parse(_postdata);
            try{
                route(req,resp);
            }
            catch(e){
                resourceNotFoundError(req, resp);
            }
            
        });

    } else{
        resourceNotFoundError(req, resp);
    };

    //console.log("sample output to console");

});
app.listen(8081);

module.exports = app;