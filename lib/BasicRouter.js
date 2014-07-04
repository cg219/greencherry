var url = require("url");
var fs = require("fs");
var path = require("path");

function BasicRouter(){
	var self = this;
	this.routes = Object.create(null);
	this.response;
	this.request;
	this.notFound = "404.html";
	this.mimes = {
		".js" : "text/javascript",
		".css" : "text/css",
		".html" : "text/html",
		".xml" : "text/xml",
		".jpeg" : "image/jpeg",
		".jpg" : "image/jpeg",
		".png" : "image/png",
		".mp3" : "audio/mpeg",
		".mp4" : "video/mp4"
	};
	this.views = "./views/";
	this.static = "./static/";
	this.router = function(request, response){
		return self.createRouter(request, response);
	}
	
	return self;
}

BasicRouter.prototype.add = function(action, path, callback) {
	var route = require("./Route");
	var self = this;
	
	if( arguments.length === 3 ){

		self.routes[path] = self.routes[path] || route;
		self.routes[path].create(action, path, callback);
		return;
	}

	self.routes[arguments[0]] = self.routes[arguments[0]] || route;
	self.routes[arguments[0]].create(arguments[0], arguments[1]);
	return;
};

BasicRouter.prototype.createRouter = function(request, response) {
	var self = this;
	var path = url.parse(request.url).pathname;
	var route = self.routes[path];

	if(route){
		response.writeHead(200);
		route.run(request.method, request, response);
	}
};

BasicRouter.prototype.error = function(callback) {
	var self = this;
	var contentObj = {
		content : "",
		type : "",
		code: 404
	};

	fs.readFile(self.views + self.notFound, function(err, content){
		contentObj.content = content;
		contentObj.type = "text/html";
		callback(err, contentObj);
	});

};

BasicRouter.prototype.serve = function(file, callback) {
	var self = this;
	var contentObj = {
		content : "",
		type : "",
		code: 200
	};

	fs.exists(self.views + file, function(isExisting){
		if(isExisting){
			fs.readFile(self.views + file, function(err, content){
				contentObj.content = content;
				contentObj.type = self.mimes[path.extname(file)] || "text/plain";
				contentObj.code = err ? 500 : 200;
				callback(err, contentObj);
			});
			return
		}
		self.error(callback);
	})
};

module.exports = new BasicRouter;