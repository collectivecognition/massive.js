var util = require("util");
var io = require("socket.io");
var express = require("express");
var massive = require("./massive");

var app = require('express').createServer();

app.use("/", express.static(__dirname + '/'));

app.get('/', function(req, res){

	res.send(req.params);

});

app.listen(3000);

var j = new massive.Job(function(){
	
	this.results = [];
	
	for(ii = 0; ii < 1000; ii++){
		
		this.queue(function(){
			/*for(ii = 0; ii < 10000000; ii++){
				var result = ii;
			}*/
			var hash = hex_md5(Math.random() + "");
			return hash;
		}, ii);
	
	}
	
	console.log(this._queue.length + " tasks generated")

}, function(result, id){
	
	this.results.push(result);
	console.log("Result: " + result);
	console.log("Queue remaining: " + this._queue.length);
	console.log("Assigned tasks: " + this._assigned.length);

}, function(){
	
	console.log("Done: " + this.results);

}, {
	port: 1234,
	dependencies: ["/md5.js"]
});