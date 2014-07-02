var url = require("url");

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
		route.run(request.method, request, response);
	}
};

module.exports = new BasicRouter;