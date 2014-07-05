var path = require("path");

function Route(){
	this.path = "";
	this.methods = Object.create(null);
	this.parameters = Object.create(null);
	return this;
}

Route.prototype.create = function(method, endpoint, callback) {
	var self = this;
	var isAllArgs = arguments.length === 3;
	var _method = isAllArgs ? method.toLowerCase() : "get";
	var _endpoint = isAllArgs ? endpoint : arguments[0];
	var _callback = isAllArgs ? callback : arguments[1];
	var hasParameter = Route.prototype.hasParameter(path.basename(_endpoint));
	
	self.path = hasParameter.exists ? path.dirname(_endpoint) : _endpoint;
	self.methods[_method] = _callback;
	self.parameters[_method] = hasParameter.exists ? hasParameter.name : undefined;
	return self;
};

Route.prototype.new = function() {
	return new Route();
};

Route.prototype.hasParameter = function(parameter) {
	var index = parameter.indexOf(":");

	return {
		exists: index !== -1,
		name: index > -1 ? parameter.slice(index + 1) : undefined
	}
};

Route.prototype.run = function(method, request, response) {
	var self = this;
	var _method = method.toLowerCase() || "get";

	if( self.parameters[_method]){
		request.parameters = {};
		request.parameters[self.parameters[_method]] = path.basename(request.url);
	}
	self.methods[_method](request, response);
};

module.exports = exports = new Route;