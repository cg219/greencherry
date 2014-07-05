# imkreative-nodejs
Nodejs Modules for building web apps

## Install
`npm install imkreative`

## Usage

### Importing Library
```javascript
var imkreative = require("imkreative");
```

### Creating a Server
```javascript
var imkreative = require("imkreative");
var server = imkreative.BasicServer;

server.create();
server.listen();
```

### Customizing Server detail
```javascript
var imkreative = require("imkreative");
var server = imkreative.BasicServer;

server.create();
server.listen(8888);
```

```javascript
var imkreative = require("imkreative");
var server = imkreative.BasicServer;

server.create();
server.listen({
	host: 127.0.0.1,
	port: 8888,
	callback: function(){
		console.log("Server is Listening")
	}
});
```