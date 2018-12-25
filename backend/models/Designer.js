const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesignerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, refs: "users" },
  handle: { type: String, required: true, max: 40 },
  bio: { type: String, required: true },
  website: { type: String },
  skills: { type: [String], required: true },
  dribbble: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = Designer = mongoose.model("designer", DesignerSchema);
