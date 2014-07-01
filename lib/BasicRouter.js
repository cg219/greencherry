var url = require("url");

function BasicRouter(){
	this.routes = Object.create(null);
	this.response;
	this.request;
}

BasicRouter.prototype.add = function(action, path, callback) {
	var route = require("./Route")();
	var self = this;

	self.routes[path] = self.routes[path] || route;
	
	if( arguments.length === 3 ){
		self.routes[path].add(action, path, callback);
		return;
	}

	self.routes[path].add(arguments[0], arguments[1]);
	return;
};

BasicRouter.prototype.router = function(res, req) {
	var self = this;
	var path = url.parse(req.url).pathname;
	var route = self.routes[path];

	if(route){
		route.run(res.method);
	}

};

