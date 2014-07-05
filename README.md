# Green Cherry
Nodejs library for building web apps

### Disclaimer
This library is still in active development and would not recommend using in projects until version 1.0.0.

### Install
```javascript
npm install greencherry
```

### Importing Library
```javascript
var cherry = require("greencherry");
```

### Creating a Server
```javascript
var cherry = require("greencherry");
var server = cherry.BasicServer;

server.create();
server.listen();
```

### Customizing Server detail
Passing just the port

```javascript
var cherry = require("greencherry");
var server = cherry.BasicServer;

server.create();
server.listen(8888);
```

Passing an options object
```javascript
var cherry = require("greencherry");
var server = cherry.BasicServer;

server.create();
server.listen({
	host: 127.0.0.1,
	port: 8888,
	callback: function(){
		console.log("Server is Listening")
	}
});
```

### Using the Router

```javascript
var cherry = require("greencherry");
var server = cherry.BasicServer;
var api = cherry.BasicRouter;

server.create(api.router);
server.listen();
```

### Adding a Route
```javascript
var cherry = require("greencherry");
var server = cherry.BasicServer;
var api = cherry.BasicRouter;

api.add("/", function(req, res){
	res.writeHead(200);
	console.log("Home Page")
	res.end("Server Pinged From Router");
})

server.create(api.router);
server.listen();
```

### Adding a Route with a parameter
```javascript
var cherry = require("greencherry");
var server = cherry.BasicServer;
var api = cherry.BasicRouter;

api.add("/post/:id", function(req, res){
	res.writeHead(200);
	console.log("Posts Page")
	console.log("Params: " + req.parameters.id);
	res.end("Server Pinged From Router");
})

server.create(api.router);
server.listen();
```

### Links
[Blog](http://imkreative.com)
[Portfolio](http://portfolio.imkreative.com)
[Twitter](http://twitter.com/kreativeking)

### License
>Copyright (c) 2014 Clemente Gomez.
>All rights reserved.
>
>Redistribution and use in source and binary forms are permitted
>provided that the above copyright notice and this paragraph are
>duplicated in all such forms and that any documentation,
>advertising materials, and other materials related to such
>distribution and use acknowledge that the software was developed
>by the imkreative. The name of the
>imkreative may not be used to endorse or promote products derived
>from this software without specific prior written permission.
>THIS SOFTWARE IS PROVIDED ``AS IS'' AND WITHOUT ANY EXPRESS OR
>IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
>WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.