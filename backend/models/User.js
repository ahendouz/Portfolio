const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/ahendouz/image/upload/v1545928173/avatar-.jpg"
  },
  type: { type: String, require: true },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("users", userSchema);
