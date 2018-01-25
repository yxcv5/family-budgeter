const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

//assume a person cannot be on two user accounts, each person has unique id
const MemberSchema = new Schema({
  fullName: {type: String, trim: true, required: true, unique: true},
  role: {type: String, trim: true, required: true},
  imgUrl: String,
  shoppingBehavior: String,
  created: {
    type: Date,
    default: Date.now
  },
  earnings: [{
    type: Schema.Types.ObjectId,
    ref: "Earning"
  }],
  spendings: [{
    type: Schema.Types.ObjectId,
    ref: "Spending"
  }]
});

MemberSchema.plugin(uniqueValidator, { message: "This name is already taken" });

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;