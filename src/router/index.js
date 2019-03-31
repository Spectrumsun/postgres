const express = require('express');

const Router = express.Router();
const User = require('../controller/UserController')

Router.get('/', User.welcome);
Router.post('/user', User.createUser);
Router.get('/users', User.getUsers);
Router.get('/user/:id', User.getOneUser);
Router.put('/user/:id', User.updateUser);
Router.delete('/user/:id', User.deleteUser)

module.exports =  Router;
 