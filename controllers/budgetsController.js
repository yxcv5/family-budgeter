const Earning = require("../models").Earning;
const Spending = require("../models").Spending;
const Budget = require("../models").Budget;
const Member = require("../models").Member;

module.exports = {
  getIncomeSum: function(req, res) {
    const acct = req.userId;
    const month = parseInt(req.params.month, 10);
    const year = parseInt(req.params.year, 10);
    let start = new Date(year, month, 1);
    let end = new Date(year, month + 1, 0);
    if(month===12) {
      start = new Date(year, 0, 1);
      end = new Date(year, 11, 31);
    }
    console.log(start);
    console.log(end);
    Earning
    .aggregate([
      { $match: { $and: [ {account: acct}, {date: { $gte: start, $lt: end }} ] }},
      { $group: { _id: null, total: { $sum: "$amount" } }}
      ], function(err, sum) {  //result is an array [{ _id: null, total: sum }]
        if(err) {
          res.status(422).json(err);
        } else {
          res.json(sum);
        }
      });
  },
  getIncomes: function(req, res) {
    Earning
    .find({
      account: req.userId
    })
    .sort ({date: -1})
    .then(incomes => res.json(incomes))
    .catch(err => res.status(422).json(err));
  },
  addIncome: function(req, res) {
    const earning = new Earning(req.body);
    earning.setAccount(req.userId);
    earning.save()
      .then(item => {
        res.json(item);
        if(item.memberName !== " ") {
          Member.update({fullName: item.memberName},
           { $push: { earnings: item._id }},
           function(err, response) {
            if(err) 
              console.log(err);
            else
              console.log(response);
           }
          );
        }
      })
      .catch(err => res.status(422).json(err));
  },
  updateIncome: function(req, res) {
    let prev = "";
    const key = req.body.key;
    const value = req.body.value;
    Earning
    .findOne({_id: req.body.id})
    .then(doc => {
      if(key==="memberName") {
        prev = doc[key];
        if(!prev)
          prev = "nomember";        
      }
      doc[key] = value;      
      return doc.save();
    })
    .then(inc => {
      res.json(inc);
      if(prev==="nomember") {
        Member.update({fullName: inc.memberName},
         { $push: { earnings: inc._id }},
         function(error, response) {
          if(error) 
            console.log(error);
          else
            console.log(response);
         }
        );
      }
      else if(prev) {
        Member.update({fullName: prev},
         { $pull: { earnings: inc._id }},
         function(error, response) {
          if(error) 
            console.log(error);
          else
            console.log(response);
         }
        );
        if(inc.memberName) {
          Member.update({fullName: inc.memberName},
           { $push: { earnings: inc._id }},
           function(error, response) {
            if(error) 
              console.log(error);
            else
              console.log(response);
           }
          );
        }
      }
    })
    .catch(err => res.status(422).json(err));
  },
  deleteIncome: function(req, res) {
    Earning.findByIdAndRemove(req.params.id)
      .then(removed => {
        res.json(removed);
        if(removed.memberName !== " ") {
          Member.update({fullName: removed.memberName},
           { $pull: { earnings: removed._id }},
           function(err, response) {
            if(err) 
              console.log(err);
            else
              console.log(response);
           }
          );
        }
      })
      .catch(err => res.status(422).json(err));
  },
  getSpendings: function(req, res) {
    Spending
    .find({
      account: req.userId,
      category: req.params.cat
    })
    .sort ({date: -1})
    .then(spendings => res.json(spendings))
    .catch(err => res.status(422).json(err));
  },
  addSpending: function(req, res) {
    const spending = new Spending(req.body);
    spending.setAccount(req.userId);
    spending.save()
      .then(item => {
        res.json(item);
        if(item.memberName !== " ") {
          Member.update({fullName: item.memberName},
           { $push: { spendings: item._id }},
           function(err, response) {
            if(err) 
              console.log(err);
            else
              console.log(response);
           }
          );
        }
      })
      .catch(err => res.status(422).json(err));
  },
  updateSpending: function(req, res) {
    let prev = "";
    const key = req.body.key;
    const value = req.body.value;
    Spending
    .findOne({_id: req.body.id})
    .then(doc => {
      if(key==="memberName") {
        prev = doc[key];
        if(!prev)
          prev = "nomember"
      }
      doc[key] = value;      
      return doc.save();
    })
    .then(out => {
      res.json(out);
      if(prev==="nomember") {
        Member.update({fullName: out.memberName},
         { $push: { spendings: out._id }},
         function(error, response) {
          if(error) 
            console.log(error);
          else
            console.log(response);
         }
        );
      }
      else if(prev) {
        Member.update({fullName: prev},
         { $pull: { spendings: out._id }},
         function(error, response) {
          if(error) 
            console.log(error);
          else
            console.log(response);
         }
        );
        if(inc.memberName) {
          Member.update({fullName: inc.memberName},
           { $push: { earnings: inc._id }},
           function(error, response) {
            if(error) 
              console.log(error);
            else
              console.log(response);
           }
          );
        }
      }
    })
    .catch(err => res.status(422).json(err));
  },
  deleteSpending: function(req, res) {
    Spending.findByIdAndRemove(req.params.id)
      .then(removed => {
        res.json(removed);
        if(removed.memberName !== " ") {
          Member.update({fullName: removed.memberName},
           { $pull: { spendings: removed._id }},
           function(err, response) {
            if(err) 
              console.log(err);
            else
              console.log(response);
           }
          );
        }
      })
      .catch(err => res.status(422).json(err));
  },
  getSpendingSum: function(req, res) {
    const categories = ['Home', 'Utilities', 'Kids', 'Health', 'Transportation', 'Dining', 'Entertainment', 'Miscellaneous'];
    const acct = req.userId;
    const month = parseInt(req.params.month, 10);
    const year = parseInt(req.params.year, 10);
    let start = new Date(year, month, 1);
    let end = new Date(year, month + 1, 0);
    if(month===12) {
      start = new Date(year, 0, 1);
      end = new Date(year, 11, 31);
    } 
    Spending
    .aggregate([
      { $match: { $and: [ {account: acct}, {date: { $gte: start, $lt: end } }] }},
      { $group: { _id: "$category", total: { $sum: "$amount" } }}
      // { $sort: { _id: 1} }
      ], function(err, sums) {  //result is an array of object
        if(err) {
          res.status(422).json(err);
        } else {
          if(sums.length>0) {
            let found;
            categories.forEach(function(category){
              found = sums.find(function(element){
                return category === element._id;
              });
              if(typeof found === "undefined")
                sums.push({
                  "_id": category,
                  "total": 0
                });
            });           
          }
          res.json(sums);
        }
      });
  },
  getMonthlyBudget: function(req, res) {
    const categories = ['Income', 'Home', 'Utilities', 'Kids', 'Health', 'Transportation', 'Dining', 'Entertainment', 'Miscellaneous'];
    Budget
    .aggregate([
      { $match: { account: req.userId } },
      { $group: { _id: "$category", total: { $sum: "$monthly" } }}
      // { $sort: { _id: 1}}
      ], function(err, sums) { 
        if(err) {
          res.status(422).json(err);
        } else {
          if(sums.length>0) {
            let found;
            categories.forEach(function(category){
              found = sums.find(function(element){
                return category === element._id;
              });
              if(typeof found === "undefined")
                sums.push({
                  "_id": category,
                  "total": 0
                });
            });           
          }
          res.json(sums);
        }
      });
  },
  getYearlyBudget: function(req, res) {
    const categories = ['Income', 'Home', 'Utilities', 'Kids', 'Health', 'Transportation', 'Dining', 'Entertainment', 'Miscellaneous'];
    Budget
    .aggregate([
      { $match: { account: req.userId } },
      { $group: { _id: "$category", total: { $sum: "$yearly" } }}
      // { $sort: { _id: 1}}
      ], function(err, sums) { 
        if(err) {
          res.status(422).json(err);
        } else {
          if(sums.length>0) {
            let found;
            categories.forEach(function(category){
              found = sums.find(function(element){
                return category === element._id;
              });
              if(typeof found === "undefined")
                sums.push({
                  "_id": category,
                  "total": 0
                });
            });           
          }
          res.json(sums);
        }
      });
  },
  getBudgets: function(req, res) {
    Budget
    .find({
      account: req.userId,
      category: req.params.cat
    })
    // .sort ({amount: -1})
    .then(budgets => res.json(budgets))
    .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    const key = req.body.key;
    const value = req.body.value;
    console.log("The req.body.id is of type: " + typeof req.body.id);
    console.log("The req.body.id is: " + req.body.id);
    Budget
    .findOne({_id: req.body.id})
    .then(doc => {
      doc[key] = value;
      doc.setMonthYearAvg();
      return doc.save();
    })
    .then(budget=>{
      res.json(budget);
    })
    .catch(err => res.status(422).json(err));
  },
  add: function(req, res) {
    const budget = new Budget(req.body);
    console.log("What's the type of req.userId? " + typeof req.userId);
    console.log("What's req.userId? " + req.userId);
    budget.setAccount(req.userId);
    budget.setMonthYearAvg();
    budget.save()
      .then(item => {
        res.json(item);
      })
      .catch(err => res.status(422).json(err));
  },
  delete: function(req, res) {
    Budget.findByIdAndRemove(req.params.id)
      .then(removed => {
          res.json(removed);
      })
      .catch(err => res.status(422).json(err));
  }
};

  
