const qna = require('@tensorflow-models/qna');
require('@tensorflow/tfjs-node');
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const url = "mongodb://localhost:27017/IAnswers";
const bodyParser = require('body-parser');
const path = require("path");
const session = require("express-session");
const ObjectID = require('mongodb').ObjectID;
const app = express();
let modelPromise = {};
var answer = null;

const http = require('http').Server(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www')));

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
    username: String,
    password: String,
    motto: String,
},
{
  collection: 'users',
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

const User = mongoose.model('users', userSchema);
const Topic = mongoose.model('topics', topicsSchema);

http.listen(3005, function () {
	modelPromise = qna.load({modelUrl: 'file://mobilebert_1/model.json'});
	console.log('Server is running. Point your browser to: http://localhost:3005');
});

const process = async (question, passage) => {
  const model = await modelPromise;
  answers = await model.findAnswers(question, passage);
};

app.post('/signup', function(request, response)
{
	response.setHeader('Content-Type', 'application/json');

	var name = request.body.name;
	var username = request.body.username;
	var password = request.body.password;
  var motto = request.body.motto;
		var userData = {
			_id: new ObjectID(),
      password: request.body.password,
			username: request.body.username,
			name: request.body.name,
      surname: request.body.surname,
      motto: request.body.motto
	}
	var query = {username : username};
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
            extra: data,
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

  var query = {title : subject};
  Topic.find(query, async function(err, result) {
    if (err) throw err;
    if (typeof result !== 'undefined' && result.length > 0) {
      await process(question, result[0].text);
			response.send(JSON.stringify({
				message: 'Successful',
				answers: answers
			}));
    }
    else {
      response.send(JSON.stringify({message: 'Error', answers: answers}));
    }
  });
});

app.post('/login', function(request, response)
{
	response.setHeader('Content-Type', 'application/json');
	var username = request.body.username;
	var password = request.body.password;

	var query = {username : username};

	User.find(query, function(err, result)
	{
		if (err) throw err;
	    if (typeof result !== 'undefined' && result.length > 0) {
		    if(result[0].password == password) {
		    	response.send(JSON.stringify({
    		    		username: username,
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

app.post('/topics', function(request , response){
	response.setHeader('Content-Type', 'application/json');
	var username = request.body.username;
	var password = request.body.password;

	var query = {};
	const topics = mongoose.model('topics', topicsSchema);
	topics.find(query, function(err, result)
	{
		if (err) throw err;
	    if (typeof result !== 'undefined' && result.length > 0) {
			response.send(JSON.stringify({result, message: 'Successful' }));
		}
		else
		{
			response.send(JSON.stringify({
				message: 'No Such Topics'
			}));
		}
	})
});

app.get('/api/topics', (req, res) => {
  var query = {};
  const topics = mongoose.model('topics', topicsSchema);
  topics.find(query, function(err, result)
  {
    if (err) throw err;
    res.send(result);
  }).select('-_id');
});

app.get('/api/topics/titles', (req, res) => {
  var query = {};
  const topics = mongoose.model('topics', topicsSchema);
  topics.find(query, function(err, result)
  {
    if (err) throw err;
    res.send(result);
  }).select('title -_id');
});

app.get('/api/topics/texts', (req, res) => {
  var query = {};
  const topics = mongoose.model('topics', topicsSchema);
  topics.find(query, function(err, result)
  {
    if (err) throw err;
    res.send(result);
  }).select('text -_id');
});

app.get('/api/:username', (req, res) => {
  var username = req.params.username;

  var query = {username : username};

	User.find(query, function(err, result)
	{
		if (err) throw err;
	  res.send(result);
	}).select('-_id');
});
