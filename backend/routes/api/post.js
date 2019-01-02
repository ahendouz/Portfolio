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

// GET POST BY ID -- PUBLIC ROUTE
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ error: "no post found" }));
});

// ADD A POST -- PRIVATE ROUTE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ({ user: { id: user }, body: { text, name, avatar } }, res) => {
    const { errors, isValid } = validatorPostInput(text);

    // Check validation
    if (!isValid) {
      res.status(400).json({ errors });
    }

    const newPost = new Post({
      text,
      name,
      avatar,
      user
    });

    newPost.save().then(post => res.json(post));
  }
);


module.exports = router;
