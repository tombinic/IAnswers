//for express
const qna = require('@tensorflow-models/qna');
const tfjs = require('@tensorflow/tfjs');
require ('@tensorflow/tfjs-backend-cpu');
require ('@tensorflow/tfjs-backend-webgl');
require('@tensorflow/tfjs-node');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
require('@tensorflow/tfjs-core');
const express = require('express');
const app = express();
const http = require('http').Server(app);
var MongoClient  = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/nlpUser";
var modelPromise = {};
var answer = null;
const cors = require("cors");
app.use(cors());

//Body Parser Setup
const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www')));
//For session
const session = require("express-session");
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  // proxy: true,
  // cookie: { secure: true }
}));

mongoose.connect(url, function(err)
{
	if(err)
		throw err;
	console.log("Mongoose connection established");
});

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    email: String,
    password: String,
    motto: String,
},
{
  collection: 'User',
  versionKey: false
});

const topicsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
	title: String,
  summary: String,
  text: String,
  topic: String,
},
{
  collection: 'topics',
  versionKey: false

});

const User = mongoose.model('User', userSchema);
const Topic = mongoose.model('topics', topicsSchema);

// Listen to the required Port
http.listen(3005, function () {
	console.log('Server is running. Point your browser to: http://localhost:3005');
});

app.get('/checkLogin', function(request, response)
{
	if(!request.session.email)
	{
		response.send(JSON.stringify({
			result: 'No Session'
		}));
	}
	else
	{
		response.send(JSON.stringify({
			result: 'Session Exists',
			email: request.session.email
		}));
	}
});

app.post('/signup', function(request, response)
{
	response.setHeader('Content-Type', 'application/json');

	var name = request.body.name;
	var email = request.body.email;
	var password = request.body.password;
  var motto = request.body.motto;

	if(request.body.email && request.body.password && request.body.name)
	{
		var userData = {
			_id: new ObjectID(),
      password: request.body.password,
			email: request.body.email,
			name: request.body.name,
      surname: request.body.surname,
      motto: request.body.motto
		}
	}
	else
	{
		response.send(JSON.stringify({
			message: 'Invalid Data'
		}));
	}
	var query = {email : email};
	User.find(query, function(err, result)
	{
		if (err) throw err;

	    if (typeof result !== 'undefined' && result.length > 0) {
	    	response.send(JSON.stringify({
				message: 'User already exists!'
			}));
		}

		else
		{
			var userObj = new User(userData);
			userObj.save(function(error,data)
			{
					response.send(JSON.stringify({
            extra:data,
								message: "Successful"
					}));

			});
		}
	});
});

app.post('/question', function(request, response)
{
	response.setHeader('Content-Type', 'application/json');
	var question = request.body.question;
  var subject = request.body.subject;

  console.log(question + " " + subject);

  async function loadModel()  {
    modelPromise = await qna.load();
    return modelPromise;
  };

  var query = {title : subject};
  Topic.find(query, function(err, result) {
    if (err) throw err;
    if (typeof result !== 'undefined' && result.length > 0) {
      async function process (a, b) {
        await loadModel();
        const answers = await modelPromise.findAnswers(a, b);
        response.send(JSON.stringify({
          message: 'Successful',
          answers: answers
        }));
      };
	  console.log(result[0].text);

      process(question, result[0].text);

    }
    else{
      response.send(JSON.stringify({message: 'Error'}));
    }
  });
});

app.post('/login', function(request, response)
{
	response.setHeader('Content-Type', 'application/json');
	var email = request.body.email;
	var password = request.body.password;
  	console.log(password);
	// request.session.email = email;
	if(request.body.email && request.body.password)
	{
		var userData = {
			email: request.body.email,
			password: request.body.password
		}
	}
	else
	{
		response.send(JSON.stringify({
			message: 'Invalid Data'
		}));
	}

	var query = {email : email};

	User.find(query, function(err, result)
	{
		if (err) throw err;
	    if (typeof result !== 'undefined' && result.length > 0) {
		    if(result[0].password == password)
		    {
		    	save_session(request, email);
		    	response.send(JSON.stringify({
		    		email: email,
		    		name: result[0].name,
            surname: result[0].surname,
            motto: result[0].motto,
					message: 'Successful'
				}));
		    }
		    else
		    {
		    	response.send(JSON.stringify({
					message: 'Wrong Password'
				}));
		    }
		}
		else
		{
			response.send(JSON.stringify({
				message: 'No Such User'
			}));
		}
	})
});


app.post('/topic', function(request , response){
	response.setHeader('Content-Type', 'application/json');
	var topic = request.body.title;
  	console.log(title);
	const topics = mongoose.model('topics', topicsSchema);
	var query = {title : title};
	topics.find(query, function(err, result)
	{
		if (err) throw err;
	    if (typeof result !== 'undefined' && result.length > 0) {
			response.send(JSON.stringify(result));
		}
		else
		{
			response.send(JSON.stringify({
				message: 'No Such Topics'
			}));
		}
	})
});

app.post('/topics', function(request , response){
	response.setHeader('Content-Type', 'application/json');
	var email = request.body.email;
	var password = request.body.password;
  	console.log(password);

	var query = {};
	const topics = mongoose.model('topics', topicsSchema);
	topics.find(query, function(err, result)
	{
		if (err) throw err;
	    if (typeof result !== 'undefined' && result.length > 0) {
			response.send(JSON.stringify({result , message: 'Successful' }));
			console.log(result);
		}
		else
		{
			response.send(JSON.stringify({
				message: 'No Such Topics'
			}));
		}
	})
});



var save_session = function(request, email)
{
	request.session.email = email;
}
