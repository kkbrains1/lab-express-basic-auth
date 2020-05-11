const express = require('express');
const privateRoute = require('../midleware/private-route');

const privateRouter = new express.Router();


privateRouter.get('/main', privateRoute, (req, res) => {
  res.render('main');
});

privateRouter.get('/private', privateRoute, (req, res) => {
  res.render('private');
});

privateRouter.get('/profile', privateRoute, (req, res) => {
  res.render('profile');
  //console.log('profilepage req', req.user);
});


module.exports = privateRouter;