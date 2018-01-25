const Member = require("../models").Member;
const User = require("../models").User;
const parseErrors = require("../utils/parseErrors");

module.exports = {
  add: function(req, res) {
    Member.create(req.body)
      .then( dbMember => {
        console.log(dbMember._id);
        console.log(req.userId);
        User.update({ _id: req.userId }, 
          { $push: { members: dbMember._id } }, function (err, response) {
            if(err) 
              res.status(422).json({errors: parseErrors(err.errors)});
            else {
              console.log(response);
              res.json(response);
            }
        });
    });
  },
  remove: function(req, res) {
    Member.findByIdAndRemove(req.params.id)
      .then( removed => {
        return User.findOneAndUpdate({ _id: req.userId }, { $pull: { members: removed._id } }, { new: true });
      })
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  },
  getActivities: function(req, res) {
    Member.findById(req.params.id)
      .populate({
        path: 'earnings',
        sort: { date: -1 },
        options: { limit: 3 }
      })
      .populate({
        path: 'spendings',
        sort: { date: -1 },
        options: { limit: 3 }
      })
      .then(function(dbMember) {
        res.json(dbMember);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  }
};
