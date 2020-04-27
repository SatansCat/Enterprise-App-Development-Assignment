var express = require('express');
var bodyParser = require("body-parser");
var http = require('http');
var fs = require('fs');
var app = express();
var path = require("path");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;

app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/images"));
app.use(express.urlencoded());

//Creating the server
http.createServer(app).listen(9090);

//Setting up the Database
var url = "mongodb://localhost:27017/ProjectDatabase";
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
	if (err) throw err;
	var dbo = db.db("projectDatabase");
	console.log("Database connected");
	/* initialising a user
	var BaseUser = {name:"Enda Keane", password:"C16497656"};
	dbo.collection("users").insertOne(BaseUser, function(err,res) {
		if (err) throw err;
		console.log("Database connected to and base user added");
		db.close();
	})*/
});

app.get('/', function(req,res){
	let filename = "./view/Login.html";
	fs.readFile(filename, function(err,data){
		if(err)
		{
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not found");
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		}
	})
})

app.get('/login', function(req,res){
	let filename = "./view/Login.html";
	fs.readFile(filename, function(err,data){
		if(err)
		{
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not found");
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		}
	})
})

app.get('/lists', function(req,res){
	let filename = "./view/List.html";
	fs.readFile(filename, function(err,data){
		if(err)
		{
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not found");
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		}
	})
})

app.get('/createAccount', function(req,res){
	let filename = "./view/CreateAccount.html";
	fs.readFile(filename, function(err,data){
		if(err)
		{
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not found");
		}
		else
		{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		}
	})
})

app.post('/createAccount', async function(req,res){
		//Gather the input from the form
		
		var username = req.body.login;
		var password = req.body.password;
		

		//Hash the password, so it can't be read, using 10 itterations to ensure it's secure
		var cryptword = await bcrypt.hash(password, 10);


			//set up the user to be pushed to the database
			var newUser = {
				name: username,
				password: cryptword
			};


			var url = "mongodb://localhost:27017";

			MongoClient.connect(url, {useUnifiedTopology: true}, async function(err, db) {
				if (err) throw err;



				var dbo = await db.db("projectDatabase");
				console.log("Database connected for register");

				dbo.collection("users").insertOne(newUser, function(err,res) {
					if (err) throw err;
					console.log("Database connected to and new user added");
					db.close();
				});

				
			});
		//var hashPassword = await bcrypt.hash(req.body.password, 10)
		//Push to backend database
		res.redirect("http://localhost:9090/Login.html")
})


app.post('/login', async function(req,res){
	res.redirect("http://localhost:9090/List.html")
})