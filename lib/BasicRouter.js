var url = require("url");
var fs = require("fs");

function BasicRouter(){
	var self = this;
	this.routes = Object.create(null);
	this.response;
	this.request;
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

BasicRouter.prototype.serve = function(file, type) {
	type = type || "text/plain";
	var content = fs.readFileSync(file, "binary");
	
	return {content: content, type: type};
};

module.exports = new BasicRouter;