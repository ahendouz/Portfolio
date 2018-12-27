const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  handle: { type: String, required: true, max: 40 }, // example => www.portflio.com/YOURNAME
  bio: { type: String, required: true },
  github: { type: String },
  website: { type: String },
  skills: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: {
        type: String,
        default:
          "https://res.cloudinary.com/ahendouz/image/upload/v1545928976/jnxnihn6oi0wabhm1tev.png"
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

module.exports = Developer = mongoose.model("developer", DeveloperSchema);
