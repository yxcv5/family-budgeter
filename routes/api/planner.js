const router = require("express").Router();
const budgetsController = require("../../controllers/budgetsController");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate);
//matches /api/planner
router.route("/incomes")
  .get(budgetsController.getIncomes)
  .post(budgetsController.addIncome)
  .put(budgetsController.updateIncome);

router.route("/incomes/:id")
  .delete(budgetsController.deleteIncome);

router.route("/income/:month/:year")
  .get(budgetsController.getIncomeSum);

router.route("/spendings/:cat")
  .get(budgetsController.getSpendings);

router.route("/spendings")
  .post(budgetsController.addSpending)
  .put(budgetsController.updateSpending);

router.route("/spendings/:id")
  .delete(budgetsController.deleteSpending);

router.route("/spending/:month/:year")
  .get(budgetsController.getSpendingSum);

router.route("/monthlybudget")
  .get(budgetsController.getMonthlyBudget);

router.route("/yearlybudget")
  .get(budgetsController.getYearlyBudget);

router.route("/budgets/:cat")
  .get(budgetsController.getBudgets);

router.route("/budgets")
  .post(budgetsController.add)
  .put(budgetsController.update);

router.route("/budgets/:id")
  .delete(budgetsController.delete);

module.exports = router;