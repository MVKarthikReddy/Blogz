const jwt = require('jsonwebtoken');
const errorHandler = require('./errorHandler.js');

const verifyToken = (req, res, next) => {

  console.log('hello')
  const token = req.headers['authorization'].split(' ')[1];
  console.log(token)
  

  if (!token) {
    
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('error')
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken