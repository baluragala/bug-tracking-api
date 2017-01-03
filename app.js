const express = require('express');
const chalk = require('chalk');

const mongoose=require('mongoose');
const db=require('./models/db.js');
const users = require('./routes/users');
const bugs = require('./routes/bugs');
const projects = require('./routes/projects');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const PORT = process.env.PORT || 8080;

//user routes
app.post('/signup',users.create);
app.post('/login',users.login);
app.post('/logout',users.logout);

//projects
app.get('/projects',projects.getAllProjects);
app.get('/projects/:projectId',projects.getProjectById);
app.post('/projects',projects.create);
app.put('/projects/:projectId',projects.update);
app.delete('/projects/:projectId',projects.delete);

app.use(function(err,req,res,next) {
  res.send(500,err);
})

app.listen(PORT, function(err,res){
  if(err){
      console.log(chalk.red(`Bug Tracking API failed to start with error : ${err}`));
  }
  console.log(chalk.green(`Bug Tracking API running on ${PORT}`));
})
