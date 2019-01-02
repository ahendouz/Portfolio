const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesignerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  handle: { type: String, required: true, max: 40 },
  bio: { type: String, required: true },
  website: { type: String },
  dribbble: { type: String },
  skills: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: {
        type: String,
        required: true
      }
    }
  ],
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: {
        type: String,
        default:
          "https://res.cloudinary.com/ahendouz/image/upload/v1545750422/txr5fzsjpliyryzn7kvv.png"
      }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Designer = mongoose.model("designer", DesignerSchema);
