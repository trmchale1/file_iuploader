var http = require('http');
var morgan = require("morgan");
var express = require("express");

var app = express();
app.use(morgan()); 


app.all("*", function(request, response, next){
	response.writeHead(200, {"Content-Type" : "text/html"});
	next();
});

app.get("/", function(request, response){
	response.end("Welcome to the home page")
});

app.get("/uploads", function(request, response){
          response.end('<html><head><title>UPLOADZ!</title><body><form action="/uploads" method="POST" enctype="multipart/form-data"><input type="file" name="the_file"><input type="submit" value="Upload">');
});

app.post("/uploads", function(request, response){
  		var upload = "";
  		request.on("data", function(chunk){
  			upload += chunk;
  			console.log("chunk: ", chunk)
  		});

  		request.on("end", function() {
  			console.log("Handling the upload: ", upload.length);
  			response.end("Handling it!")
  		});
  	});

app.get("*", function(request, response) {
	response.end('404 -- Page not found.\n');
});


http.createServer(app).listen(8000);

console.log('Server running at http://122.0.0.1:8000/');

