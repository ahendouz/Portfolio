const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

// the routes
const users = require("../routes/api/users");
const profile = require("../routes/api/profile");
const post = require("../routes/api/post");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to our database
const db = require("./db");

// passport middleware
app.use(passport.initialize());
require("./../utils")(passport);

// welcome
app.get("/", (req, res) => res.send("Welcome"));

// User routers
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true
// };
// app.use(cors());
app.all("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// listen to a specific port on our machine
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running on port ${port} 🚀`));
