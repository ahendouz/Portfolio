const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
  user: { type: Schema.Types.ObjectId, refs: "users" },
  handle: { type: String, required: true, max: 40 }, // example => www.portflio.com/YOURNAME
  bio: { type: String, required: true },
  website: { type: String },
  skills: { type: [String], required: true },
  github: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = Developer = mongoose.model("developer", DeveloperSchema);
