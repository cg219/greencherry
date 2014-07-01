function Route(){
	this.path = "";
	this.methods = Object.create(null);
}

Route.prototype.create = function(method, path, callback) {
	var self = this;
	if( arguments.length == 3 ){
		self.methods[method.toLowerCase()] = callback;
		self.path = path;
		return self;
	}
	self.path = arguments[0];
	self.methods["get"] = arguments[1];
	return self;
};

Route.prototype.new = function() {
	return new Route();
};

Route.prototype.run = function(method) {
	var self = this;
	if(method){
		self.methods[method.toLowerCase()]();
	}
	else{
		self.methods.get();
	}
};

module.export = exports = new Route;