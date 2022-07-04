![Immagine1](https://user-images.githubusercontent.com/91635053/176286088-0bee8a1b-1576-4e22-89af-6111f3be1597.png)


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
     - [Database](#database)
  - :arrow_forward:[Frontend](#frontend-)
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

## Modules
> The modules that have been used are:
- ```Tensorflow```
- ```MongoDB```
- ```Express```
```js script
import numpy as np
```
- @tensorflow/tfjs-converter 
```python
import pandas as pd
```
- @tensorflow/tfjs-core
```python
import matplotlib.pyplot as plt
```
- @tensorflow/tfjs-node
```python
from scipy import stats
```




