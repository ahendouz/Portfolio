const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

// Load all modules
const User = require("./../../models/User");
const Designer = require("./../../models/Designer");
const Developer = require("./../../models/Developer");
const Post = require("./../../models/Post");

// load input validation
const validatorPostInput = require("../../validation/post");

// --FOR TESTING
router.get("/test", (req, res) => res.json({ msg: "post works" }));

// GET ALL POSTS -- PUBLIC ROUTE
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ error: "no posts found" }));
});


module.exports = router;
