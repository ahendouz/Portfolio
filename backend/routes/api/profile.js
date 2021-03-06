const express = require("express");
const passport = require("passport");

const router = express.Router();

// Load all profiles we have.
const User = require("./../../models/User");
const Designer = require("./../../models/Designer");
const Developer = require("./../../models/Developer");

// load validation
const validatorProfileInput = require("../../validation/profile");
const validationSkillInput = require("../../validation/skill");
const validationProjectInput = require("../../validation/project");

// --FOR TESTING
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// GET CURRENT USER PROFILE -- PRIVATE ROUTE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ({ user: { id, type } }, res) => {
    const errors = {};
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = `there is no profile yet for this ${type}`;
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET ALL USERS -- PUBLIC ROUTE
router.get("/all", async (req, res) => {
  const designers = await Designer.find().populate("user", ["name", "avatar"]);
  const developers = await Developer.find().populate("user", [
    "name",
    "avatar"
  ]);
  res.json({ users: [designers, developers] });
});

// GET USER BY THE HANDLE -- PUBLIC
router.get("/handle/:handle", async (req, res) => {
  const designer = await Designer.findOne({
    handle: req.params.handle
  }).populate("user", ["name", "avatar"]);
  const developer = await Developer.findOne({
    handle: req.params.handle
  }).populate("user", ["name", "avatar"]);
  designer
    ? res.json(designer)
    : developer
    ? res.json(developer)
    : res.json({ msg: "there's no user with this handle" });
});

// GET USER BY ID -- PUBLIC
router.get("/user/:user_id", async (req, res) => {
  const designer = await Designer.findOne({
    user: req.params.user_id
  }).populate("user", ["name", "avatar"]);
  const developer = await Developer.findOne({
    user: req.params.user_id
  }).populate("user", ["name", "avatar"]);
  designer
    ? res.json(designer)
    : developer
    ? res.json(developer)
    : res.json({ msg: "there's no user with this id" });
});

// EDIT CURRENT USER PROFILE -- PRIVATE ROUTE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (
    { user: { type, id }, body: { handle, bio, website, dribbble, github } },
    res
  ) => {
    const Profile = type === "designer" ? Designer : Developer;
    const social = type === "designer" ? dribbble : github;

    const { errors, isValid } = validatorProfileInput(
      handle,
      bio,
      website,
      social,
      type
    );
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = id;
    handle && (profileFields.handle = handle);
    bio && (profileFields.bio = bio);
    website && (profileFields.website = website);
    social && type === "designer"
      ? (profileFields.dribbble = dribbble)
      : (profileFields.github = github);

    Profile.findOne({ user: id }).then(profile => {
      if (profile) {
        // Update the user.
        Profile.findOneAndUpdate(
          { user: id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create new user.
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            // The handle is already excite.
            errors.handle = "Sorry this handle is already excite";
            res.status(400).json(errors);
          } else {
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        });
      }
    });
  }
);

// ADD SKILLS TO PROFILE -- PRIVATE ROUTE
router.post(
  "/skills",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, body: { name, description, image } }, res) => {
    const { errors, isValid } = validationSkillInput(name, description, image);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id }).then(profile => {
      const newSkill = {
        name,
        description,
        image
      };
      // Add the new skill
      profile.skills.unshift(newSkill);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// ADD PROJECTS TO PROFILE -- PRIVATE ROUTE
router.post(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, body: { name, description, image } }, res) => {
    const { errors, isValid } = validationSkillInput(name, description, image);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id }).then(profile => {
      const newProject = {
        name,
        description,
        image
      };
      // Add the new project.
      profile.projects.unshift(newProject);

      // save it to the database
      profile.save().then(profile => res.json(profile));
    });
  }
);

// DELETE SKILLS FROM PROFILE -- PRIVATE ROUTE
router.delete(
  "/skills/:skill_id",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, params }, res) => {
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id })
      .then(profile => {
        // Get the kills that has the id that we passed.
        const removeIndex = profile.skills
          .map(skill => skill.id)
          .indexOf(params.skill_id);

        // Romove it.
        profile.skills.splice(removeIndex, 1);

        // Save it in database.
        profile.save().then(profile => res.json({ profile }));
      })
      .catch(err => res.status(404).json);
  }
);

// DELETE PROJECTS FROM PROFILE -- PRIVATE ROUTE
router.delete(
  "/projects/:project_id",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id }, params }, res) => {
    const Profile = type === "designer" ? Designer : Developer;
    Profile.findOne({ user: id })
      .then(profile => {
        // Get the profile that has the id that we passed.
        const removeIndex = profile.projects
          .map(profile => profile.id)
          .indexOf(params.project_id);

        // Romove it.
        profile.projects.splice(removeIndex, 1);

        // Save it in database.
        profile.save().then(profile => res.json({ profile }));
      })
      .catch(err => res.status(404).json);
  }
);

// DELETE PROFILE & USER -- PRIVATE ROUTE
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  ({ user: { type, id } }, res) => {
    const Profile = type === "designer" ? Designer : Developer;
    console.log("PROFILE", Profile);
    Profile.findOneAndRemove({ user: id }).then(() => {
      User.findByIdAndRemove({ _id: id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
