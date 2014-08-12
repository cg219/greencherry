var url = require("url");
var fs = require("fs");
var path = require("path");
var merge = require("merge");
var Watcher = require("./DirectoryWatcher");

function BasicRouter(){
	var self = this;

	this.routes = require("./RouteList");
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

BasicRouter.prototype.add = function(method, endpoint, callback) {
	var route = require("./Route").new();
	var self = this;
	var isAllArgs = arguments.length === 3;
	var _method = isAllArgs ? method.toLowerCase() : "get";
	var _endpoint = isAllArgs ? endpoint : arguments[0];
	var _callback = isAllArgs ? callback : arguments[1];
	var cleanPath = _endpoint.indexOf(":") > -1 ? _endpoint.split("/:", 1)[0] : _endpoint;
	var currentRoute = self.routes.get(cleanPath) || route;

	self.routes.add(cleanPath, currentRoute.create(_method, _endpoint, _callback));
	return route;
};

BasicRouter.prototype.createRouter = function(request, response) {
	var self = this;
	var pathname = url.parse(request.url).pathname;
	pathname = ( pathname.substr(-1) == "/" && pathname.length > 1 ) ? pathname.slice(0, -1) : pathname;
	var route = self.routes.get(pathname);
	var routeWithParam = !route ? self.routes.get(path.dirname(pathname)) : route;
	var hasParam = false;
	var activeRoute;

	console.log("URL Requested: " + pathname);

	if(route != routeWithParam){
		hasParam = routeWithParam.parameters[request.method.toLowerCase()] !== undefined;
	}

	if(route || (routeWithParam && hasParam)){
		activeRoute = route || routeWithParam;
		// response.writeHead(200); TODO - SHould this be automated ??
		activeRoute.run(request.method, request, response, pathname);
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

BasicRouter.prototype.root = function(directory) {
	var self = this;

	self.views = path.resolve(directory, self.views) + "/";
	self.static = path.resolve(directory, self.static) + "/";
};

BasicRouter.prototype.serve = function(file, options, callback) {
	var self = this;
	var watcher = new Watcher();
	var contentObj = {
		content : "",
		type : "",
		code: 200
	};
	var defaultOptions = {
		useStatic : false,
		useViews : true,
		directories : [
			"css/",
			"js/",
			"img/"
		]
	}
	var isAllArgs = arguments.length === 3;
	var _callback = isAllArgs ? callback : arguments[1];
	var _options = merge(defaultOptions, options);
	var _file = file;
	var _base = _options.useStatic && self.static || self.views;
	var getFile = function(pathname, file){
		fs.exists(pathname + file, function(isExisting){
			if(isExisting){
				fs.readFile(pathname + file, function(err, content){
					contentObj.content = content;
					contentObj.type = self.mimes[path.extname(file)] || "text/plain";
					contentObj.code = err ? 500 : 200;
					watcher.quit();
					_callback(err, contentObj);
				});
				return;
			}
			watcher.amountChecked++;
			return;
		})
	}

	var directory;
	var retrievedFile = false;
	var directories = _options.directories;
	directories.unshift(_base);

	watcher.init(directories, function(){
		self.error(_callback);
	})

	directories.forEach(function(element, index, arr){
		var pathname = _base === element ? _base : _base + element;

		getFile(pathname, _file)
	})
};

module.exports = new BasicRouter;