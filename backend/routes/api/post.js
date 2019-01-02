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

// LIKE A POST -- PRIVATE ROUTE
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, params }, res) => {
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id }).then(profile => {
      Post.findById(params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === id).length > 0
          ) {
            return res.status(400).json({ msg: "You already likes this post" });
          }

          // Add this user to likes array.
          post.likes.unshift({ user: id });
          post.save().then(() => res.json(post));
        })
        .catch(err => res.status(404).json({ msg: "No post found" }));
    });
  }
);

// UNLIKE A POST -- PRIVATE ROUTE
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, params }, res) => {
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id }).then(profile => {
      Post.findById(params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === id).length === 0
          ) {
            return res
              .status(400)
              .json({ msg: "You have not liked this post" });
          }

          // Get like id index.
          const likeIndex = post.likes
            .map(like => like.user.toString)
            .indexOf(id);

          // Splice out of array
          post.likes.splice(likeIndex, 1);

          post.save().then(() => res.json(post));
        })
        .catch(err => res.status(404).json({ msg: "No post found" }));
    });
  }
);

// ADD A COMMENT TO THE POST -- PRIVATE ROUTE
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  ({ user: { id: user }, params, body: { text, name, avatar } }, res) => {
    console.log("HELLLLL");
    const { errors, isValid } = validatorPostInput(text);

    // Check validation
    if (!isValid) {
      res.status(400).json({ errors });
    }

    Post.findById(params.id)
      .then(post => {
        // Create a new comment.
        const newComment = {
          text,
          name,
          avatar,
          user
        };

        // Add to comments array.
        post.comments.unshift(newComment);

        // Save it to the database.
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ msg: "Post not found" }));
  }
);

// DELETE A POST -- PRIVATE ROUTE
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, params }, res) => {
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id }).then(profile => {
      Post.findById(params.id)
        .then(post => {
          // Check if the user own this post.
          if (post.user.toString() !== id) {
            return res.status(401).json({ msg: "You are not authorized" });
          }
          // Delete the post.
          post.remove().then(() => res.json({ msg: "Success" }));
        })
        .catch(err => res.status(404).json({ msg: "Post not found" }));
    });
  }
);

// DELETE A POST COMMENT -- PRIVATE ROUTE
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  ({ params }, res) => {
    Post.findById(params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
