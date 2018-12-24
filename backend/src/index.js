const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config({ path: ".env" });

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

app.get("/", (req, res) => res.send("hello"));

// User routers
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running on port ${port} 🚀`));
