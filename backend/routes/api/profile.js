const express = require("express");
const passport = require("passport");

const router = express.Router();

// Load all profiles we have.
const User = require("./../../models/User");
const Designer = require("./../../models/Designer");
const Developer = require("./../../models/Developer");

// load validation
const validatorProfileInput = require("../../validation/profile");

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// GET CURRENT USER PROFILE -- PRIVATE ROUTE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const type = req.user.type === "designer" ? Designer : Developer;
    type
      .findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = `there is no profile yet for this ${
            req.user.type
          }`;
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// EDIT CURRENT USER PROFILE -- PRIVATE ROUTE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (
    {
      user: { id, type: userType },
      body: { handle, bio, website, dribbble, github, skills }
    },
    res
  ) => {
    const type = (userType = "designer" ? Designer : Developer);
    const errors = {};
    // const { errors, isValid } = validatorProfileInput(
    //   handle,
    // //   website,
    // //   dribbble,
    // //   github,
    //   skills
    // );
    // !isValid && res.status(400).json(errors);

    const profileFields = {};

    handle && (profileFields.handle = handle);
    bio && (profileFields.bio = bio);
    website && (profileFields.website = website);
    skills !== undefined && (profileFields.skills = skills.split(","));

    console.log("🦖🦖🦖🦖🦖🦖🦖🦖🦖", profileFields);
    // Socials.
    profileFields.social = {};
    dribbble && (profileFields.social.dribbble = dribbble);
    github && (profileFields.social.github = github);

    type.findOne({ user: id }).then(profile => {
      if (profile) {
        // Update the user.
        type.findOneAndUpdate(
          { user: id },
          { $set: profileFields },
          { new: true }
        );
      } else {
        // Create new user.
        type.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            // The handle is already excite.
            errors.handle = "Sorry this handle is already excite";
            res.status(400).json(errors);
          } else {
            new type(profileFields).save().then(profile => res.json(profile));
          }
        });
      }
    });
  }
);

module.exports = router;
