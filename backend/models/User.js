const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String, require: true },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("users", userSchema);
