const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EarningSchema = new Schema({
  // category: { type: String, trim: true, required: true },
  description: { type: String, default: "Other" },
  amount: { type: Number, required: true },
  memberName: { type: String, trim: true, default: " " },
  date: { type: Date, default: Date.now },
  account: { type: Schema.Types.ObjectId, required: true }
});

EarningSchema.methods.setAccount = function(id) {
	this.account = id;
};

const Earning = mongoose.model("Earning", EarningSchema);

module.exports = Earning;