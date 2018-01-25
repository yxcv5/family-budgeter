const jwt = require("jsonwebtoken");
const User = require("../models").User;
const JWT_SECRET = 'my budget secret';

module.exports = function(req, res, next) {

  let token;

  if(req.headers && req.headers.authorization) 
    token = req.headers.authorization.split(" ")[1];

  if(token) {
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
      if (err) {
        res.status(401).json({ errors: { auth: "Not Authorized" } });
      } else {
        User.findOne({ username: decoded.username}).then(function(user) {
          if(!user) {
            res.status(401).json({ errors: { auth: "Not Authorized" } });
          } else {
            req.userId = user._id;
            next();
          }
        });
      }
    });
  } else {
    res.status(401).json({ errors: { auth: "Not Authorized" } });
  }
};