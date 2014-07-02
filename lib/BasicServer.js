var http = require("http");

function BasicServer(){
	this.server = undefined;
	return this;
}

BasicServer.prototype.create = function(connect) {
	this.server = http.createServer(connect || function(req, res){
		res.writeHead(200);
		res.end("Server Pinged");
	});
};

BasicServer.prototype.listen = function(listenObj) {
	if(this.server === undefined){
		console.log("Server not created. Run BasicServer.create()");
		return false;
	}

	listenObj = listenObj || {port: 1234, host: "localhost"}

	switch(typeof listenObj){
		case "string":
			this.server.listen(listenObj);
			console.log("Server Connected;");
			console.log("Port: " + listenObj);
			break;
		default:
			this.server.listen(listenObj.port, listenObj.host, function(){
				console.log("Server Connected;");
				console.log("IP: " + listenObj.host);
				console.log("Port: " + listenObj.port);
				listenObj.callback && listenObj.callback();
			});
	}
};

module.exports = new BasicServer;