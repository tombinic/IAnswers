![Immagine1](https://user-images.githubusercontent.com/91635053/176286088-0bee8a1b-1576-4e22-89af-6111f3be1597.png)

👬 Thanks to [KavaTappi](https://github.com/KavaTappi)

> As part of the Internet Technologies course project, it was decided to develop a platform regarding the concept of Q&A based on artificial intelligence. The following work was done with the TensorFlow.js library with a particular reference to the qna module.
The entire source code is written in **JavaScript**.
You can find informations about qna module at 

>**https://github.com/tensorflow/tfjs-models/tree/master/qna**


## Table of contents
- [IAnswers](#ianswers)
  - [Table of contents](#table-of-contents)
  - :zap:[Quick Start](#quick-start-)
  - :wrench:[Backend](#backend-)
     - [Modules](#modules)
     - [APIs](#apis)
  - :eyes:[Frontend](#frontend-)
     - [Login](#login)
     - [Signup](#signup)
     - [Dashboard](#dashboard)
     - [APIs](#apis)
     - [Profile](#profile)
---

## Quick start ⚡
Initially create the ```IAnswers``` database and create the ```topics``` and ```users``` collections.
Go inside them and import the JSON files contained in the ```database / collection``` folder.

Go into the ```backend``` folder, run the ```npm install``` command and then the ```node index.js``` command.
Go into the ```frontend``` folder, execute the ```npm install``` command and then the ```npm run start``` command.
At this point the website will be available on localhost: 3000.

It was decided to divide the system into two macro areas: frontend and backend.
Below is the general logic diagram of the application.

<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177218304-4ebbd994-84e7-46eb-ad58-74697e70ab05.png" alt="alt text" width="500"/>

## Backend 🔧
> The created backend offers some functionalities: it acts both as an HTTP server and as a client for MongoDB in which the topics and all the users with their information are kept.
Regarding the HTTP server part, the server provides REST API to the frontend. Express was the technology used, that is a web application framework for Node aimed, in particular, at the creation of REST API.
On the other hand, with regard to the MongoDB part, using the mongoose module, the server is able to interact with the database.

### Modules
> The main modules that have been used are:
- ```Tensorflow```
  
  ```js script
    const qna = require('@tensorflow-models/qna');
    const tfjsNode = require('@tensorflow/tfjs-node');
  ```
  
  The first instruction imports the module needed for this application, qna. Then using the second statement we import the TensorFlow backend written in C++. 
  This choice was made to significantly improve performance when loading the model.
  When the server is started for the first time, the loading phase of the model is started: as already mentioned above, a pre-trained BERT model is used.
  
  ```js script
    modelPromise = qna.load({modelUrl: 'file://mobilebert_1/model.json'});
  ```
  Subsequently, when the server receives the question made by the user, the phase of answering the question begins. 
  The question and the text to work on are passed as a parameter to the underlying function: then after loading the previously imported model (modelPromise), the answer is    
  searched for.
  
  ```js script
    const process = async (question, passage) => {
    const model = await modelPromise;
    answers = await model.findAnswers(question, passage);
   };
  ```
  
- ```MongoDB```
  
  ```js script
    const mongoose = require('mongoose');
    const ObjectID = require('mongodb').ObjectID;
  ```
  
  ```js script
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
  ``` 
  
- ```Express / Cors```

  ```js script
    const express = require('express');
    const cors = require("cors");
  ```

### APIs
> The backend provides several APIs: this page allows you to query them. By clicking on "complete url" you can send the request, and the response will be shown in the form of a JSON file in a new browser tab.

```js script
   app.get('/api/topics/texts', (req, res) => {
    var query = {};
    const topics = mongoose.model('topics', topicsSchema);
    topics.find(query, function(err, result)
    {
      if (err) throw err;
      res.send(result);
    }).select('text -_id');
  });
```
  
## Frontend 💻
> The frontend concerns the graphic representation of the application, designed and developed exclusively in React.
Of greater importance are the fetch APIs that allow you to make any type of HTTP request to the backend part. Material-Ui, React's main graphics library, was used for the entire frontend part.
At the bottom right of all pages there is a customizable style configuration panel to your taste.
  
### Login 
In this section you can log into the application. The user enters their credentials (username, password) and if they are correct they will be redirected to the dashboard. Otherwise the error will be communicated. It is important to note that before sending the data to the backend, the sha256 hash of the password is performed. The login information is kept locally to prevent the user from having to re-enter the credentials every time the user accesses the website: when you log out and access the application later, the credentials will be requested.

<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177222735-a67d33d2-b6ba-493f-9ac0-0c7453660931.png" alt="alt text" width="500"/>

### Signup 
In this section, unregistered users can register and access the system. All this is only possible only if a user with the same username does not already exist. If the registration part is successful, the user will be redirected to the dashboard.

<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177222833-71b81478-5f5c-4dce-b1fa-30f25bbfc314.png" alt="alt text" width="500"/>
  
### Dashboard 
Some sections can be identified in the system dashboard: at the top there is a list of all the topics available with the possibility of navigating freely through them. Once you select your favorite topic, it will appear in the central section where you can read its text. Finally, at the bottom, there is the appropriate space to write and send the application. Once the server has processed the response, it will be indicated by underlining the corresponding part directly in the text.
  
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177223248-f534a86f-de92-4f6c-ae68-8b58074de6a3.png" alt="alt text" width="500"/>
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177223263-da117c76-fd49-4bf7-a21d-d606f1851d82.png" alt="alt text" width="500"/>
  
### APIs 
The backend provides several APIs: this page allows you to query them. By clicking on "complete url" you can send the request, and the response will be shown in the form of a JSON file in a new browser tab.

<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177223352-b147e07a-acfb-4184-bdd6-5714a24e3144.png" alt="alt text" width="500"/>

### Profile 
In this personal section, the user can view his information. While in the lower part there is a reference to the list of topics present in the system. When you select a specific one, you will be redirected to the dashboard with the selected topic active

<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177223419-366a28c3-ffe8-4cf2-90bd-3fc622699601.png" alt="alt text" width="500"/>
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/177223446-d62e75b4-8b42-4f19-b7b1-cd231e0a5101.png" alt="alt text" width="500"/>
 
