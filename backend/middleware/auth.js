const isUserAuthenticated = (req, res, next) => {
  next();
};

module.exports = { isUserAuthenticated };
