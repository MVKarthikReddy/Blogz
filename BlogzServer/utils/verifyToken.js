const jwt = require('jsonwebtoken');
const errorHandler = require('./errorHandler.js');

const verifyToken = (req, res, next) => {

  const token = req.headers['authorization'].split(' ')[1];  

  if (!token) {
    
    return next(errorHandler(401, 'Unauthorized'));
  }

  // verifying the user using his token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('error')
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user; // adding user to the request
    next();
  });
};

module.exports = verifyToken