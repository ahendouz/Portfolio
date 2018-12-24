const mongoose = require("mongoose");
const schema = mongoose.Schema;

const DeveloperSchema = new Schema({
  user: { type: Schema.Types.ObjectId, refs: "users" },
  handle: { type: String, required: true, max: 40 },
  bio: { type: String, required: true },
  website: { type: String },
  skills: { type: [String], required: true },
  github: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = DeveloperSchema = mongoose.model("developer", DeveloperSchema);
