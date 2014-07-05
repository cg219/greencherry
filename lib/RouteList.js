function RouteList(){
	this.routes = {};
	return this;
}

RouteList.prototype.get = function(path) {
	var self = this;

	return self.routes[path];
};

RouteList.prototype.add = function(path, route) {
	var self = this;

	self.routes[path] = route;
};

module.exports = exports = new RouteList()