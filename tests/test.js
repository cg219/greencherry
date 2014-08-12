var server = require("../lib/BasicServer");
var router = require("../lib/BasicRouter");
var path = require("path");

router.root(path.resolve(__dirname));

router.add("/", function(req, res){
	router.serve("index.html", function(err, file){
		res.writeHead(200, {
			"Content-Type" : file.type
		});
		res.write(file.content);
		res.end();
	});
});

router.add("/posting/:haha", function(req, res){
	res.writeHead(200);
	req.parameters && console.log("Params: " + req.parameters.haha);
	res.end("Server Pinged From Router");
})

router.add("/files/:filename", function(req, res){
	req.parameters.filename && router.serve(req.parameters.filename, {useStatic : true}, function(err, file){
		if(err){
			console.log(err);
			return;
		}
		res.writeHead(200, {"Content-Type" : file.type});
		res.write(file.content);
		res.end();

	});
})

server.create(router.router);
server.listen();