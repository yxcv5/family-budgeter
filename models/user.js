const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase:true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  passwordHash: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "Member"
  }]
});

UserSchema.methods.setPassword = function(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

UserSchema.methods.isPasswordValid = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.plugin(uniqueValidator, { message: "This {PATH} is already taken" });

const User = mongoose.model("User", UserSchema);

module.exports = User;