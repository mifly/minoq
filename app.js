/**
 * Created by yichengfeng on 14-3-1.
 */
 
var http = require('http');
var url = require('url');
var services = require('./services');

// TODO: load site from mongodb
var siteMap = {'localhost':'1','hostname1.com':'2','hostname2.com':'3'};

var app = http.createServer(function(req,resp) {

    /*var _postdata = '';
    req.on('data',function(chunk){
        _postdata += chunk;
    });
    req.on('end',function(){

    });*/

    var hostname = req.headers.host && req.headers.host.split(":")[0];
    var siteId = siteMap[hostname];
    if (siteId && true) {

        var pathName = url.parse(req.url).pathname;
        var paths = pathName.split('/');
        var serviceName;
        if (paths.length >= 2) {
            serviceName = paths[1];
            console.log('servicename:' + serviceName);
            console.log(typeof services[serviceName]);
            if (services[serviceName] && typeof services[serviceName] === 'function') {
                console.log('invoke method:' +req.method);
                services[serviceName].apply(null,[req,resp]);
            }else{
                // TODO: process resource not found error
                resp.writeHead(500);
                resp.end("Resouce not found!");

            }
            ;
        };

    } else{

        // TODO: process resource not found error
        resp.writeHead(500);
        resp.end("Resouce not found!");
        
    };

    //console.log("sample output to console");

});
app.listen(8081);

module.exports = app;



