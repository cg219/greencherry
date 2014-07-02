var server = require("./lib/BasicServer");
var router = require("./lib/BasicRouter");

router.add("/", function(req, res){
	res.writeHead(200);
	console.log("Home Page")
	res.end("Server Pinged From Router");
})

server.create(router.router);
server.listen();