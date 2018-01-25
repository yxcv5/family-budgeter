const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  category: { type: String, trim: true, required: true },
  description: { type: String, default: "Other" },
  frequency: { type: String, trim: true, default: "Monthly"},
  amount: { type: Number, default: 0 },
  account: { type: Schema.Types.ObjectId, required: true },
  monthly: Number,
  yearly: Number
});

BudgetSchema.methods.setMonthYearAvg = function() {
  switch (this.frequency) {
    case 'Yearly':
      this.monthly = Math.round(this.amount/12);
      this.yearly = this.amount;
      break;
    case 'Semi-Annually':
      this.monthly = Math.round(this.amount/6);
      this.yearly = Math.round(this.amount*2);
      break;
    case 'Quarterly':
      this.monthly = Math.round(this.amount/3);
      this.yearly = Math.round(this.amount*4);
      break;
    case 'Monthly':
      this.monthly = this.amount;
      this.yearly = Math.round(this.amount*12);
      break;
    case 'Bi-Weekly':
      this.monthly = Math.round(this.amount*2);
      this.yearly = Math.round(this.amount*26);
      break;
    case 'Weekly':
      this.monthly = Math.round(this.amount*4);
      this.yearly = Math.round(this.amount*52);
      break;
    case 'Daily':
      this.monthly = Math.round(this.amount*30);
      this.yearly = Math.round(this.amount*365);
      break;
    default:

  }
};

BudgetSchema.methods.setAccount = function(id) {
	this.account = id;
};

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;