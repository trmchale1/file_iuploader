var http = require('http');
var express = require("express");

var app = express();

app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

app.use(function (request, response) {
	if(request.url == "/") {
		response.writeHead(200, { "Content-Type": "text/plain" });
		response.end("Welcome to the home page")
	}
	// About page
  else if (request.url == "/marketing") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the marketing page!");
  }

  else if (request.url == "/uploads"){
  	if(request.method == "POST"){
  		var upload = "";
  		request.on("data", function(chunk){
  			upload += chunk;
  			console.log("chunk: ", chunk)
  		})

  		request.on("end", function() {
  			console.log("Handling the upload: ", upload.length);
  			response.writeHead(200, {'Content-Type': 'text/plain'});
  			response.end("Handling it!")
  		})
  	}
  // 404'd!
  else {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.end('<html><head><title>UPLOADZ!</title><body><form action="/uploads" method="POST" enctype="multipart/form-data"><input type="file" name="the_file"><input type="submit" value="Upload">');
        }
      } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Page not found.\n');
      }

});

http.createServer(app).listen(8000);

console.log('Server running at http://122.0.0.1:8000/');

