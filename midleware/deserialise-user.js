const User = require('./../models/user');

const deSerialiseUser = (req, res, next) => {
  const userId = req.session.userId;
  if (deSerialiseUser) {
    User.findById(userId)
      .then(userDoc => {
        req.user = userDoc;
        console.log('deserialised', req.user);
        next();
      })
      .catch(error => {
        next(error);
      });
  } else {
    next();
  }
};

module.exports = deSerialiseUser;