import axios from "axios";

export default {
  signup: function(data) {
    return axios.post("/api/users/signup", data)
        .then(res => res.data.token);
  },
  login: function(data) {
    return axios.post("/api/users/login", data)
        .then(res => res.data.token);
  },
  //get account associated members
  getMembers: function() {
    return axios.get("/api/members");
  },
  //get a member and recent activities
  getMember: function(id) {
    return axios.get("/api/members/" + id);
  },
  saveMember: function(data) {
    return axios.post("/api/members", data);
  },
  deleteMember: function(id) {
    return axios.delete("/api/members/" + id);
  },
  getIncomeSum: function(month, year) {
    return axios.get("/api/planner/income/" + month + "/" + year);
  },
  getIncomes: function() {
    return axios.get("/api/planner/incomes");
  },
  createIncome: function(data) {
    return axios.post("/api/planner/incomes", data);
  },
  updateIncome: function(data) {
    return axios.put("/api/planner/incomes", data);
  },
  deleteIncome: function(id) {
    return axios.delete("/api/planner/incomes/" +id);
  },
  getSpendingSum: function(month, year) {
    return axios.get("/api/planner/spending/" + month + "/" + year);
  },
  getSpendings: function(category) {
    // return axios.get("/api/planner/spendings", { params: { cat: category}});
    return axios.get("/api/planner/spendings/" + category);
  },
  createSpending: function(data) {
    return axios.post("/api/planner/spendings", data);
  },
  updateSpending: function(data) {
    return axios.put("/api/planner/spendings", data);
  },
  deleteSpending: function(id) {
    return axios.delete("/api/planner/spendings/" +id);
  },
  getMonthlyBudget: function() {
    return axios.get("/api/planner/monthlybudget");
  },
  getYearlyBudget: function() {
    return axios.get("/api/planner/yearlybudget");
  },
  getBudgets: function(category) {
    return axios.get("/api/planner/budgets/" + category);
  },
  createBudget: function(data) {
    return axios.post("/api/planner/budgets", data);
  },
  updateBudget: function(data) {
    return axios.put("/api/planner/budgets", data);
  },
  deleteBudget: function(id) {
    return axios.delete("/api/planner/budgets/" +id);
  }
};