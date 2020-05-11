const expressSession = require('express-session')
const mongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');


const expressSessionMW = ({
  secret: 'puppyLove',
  resave: true,
  saveUninitialized: false,
  cookie : {
    maxAge: 100 * 24 * 60 * 60 * 1000
  },
  store : new mongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60
  })
});

module.exports = expressSessionMW;