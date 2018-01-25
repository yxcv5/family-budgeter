const jwt = require("jsonwebtoken");
const User = require("../models").User;
const JWT_SECRET = 'my budget secret';
const parseErrors = require("../utils/parseErrors");

module.exports = {
  signUser: function(req, res) {
    const newUser = new User(req.body);
    newUser.setPassword(req.body.password); 
    newUser.save()
           .then(user => {
              const token = jwt.sign({ _id: user._id, username: user.username }, JWT_SECRET);
              res.json({token: token});
           })
           .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  },
  logUser: function(req, res) {
    User.findOne({ username: req.body.username })
      .then(user => {
        if(user && user.isPasswordValid(req.body.password)) {
          const token = jwt.sign({ _id: user._id, username: user.username }, JWT_SECRET);
          res.json({token: token});
        }
        else {
          res.status(401).json({ errors: {login: "Invalid credentials"}});
        }
      });
  },
  getMembers: function(req, res) {
    User.findById(req.userId)
      .populate("members")
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  }
};
