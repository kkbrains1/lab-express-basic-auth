const privateRoute = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/authentication/sign-in');
  }
};

module.exports = privateRoute;