const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("./../../models/User");

// load input validation
const validateSignupInput = require("../../validation/signup");
const validateSigninInput = require("../../validation/signin");

// GET
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// POST
router.post(
  "/signup",
  ({ body: { name, email, password, typeOfUser } }, res) => {
    const { errors, isValid } = validateSignupInput(
      name,
      email,
      password,
      password,
      typeOfUser
    );
    // check validation.
    if (!isValid) {
      res.status(400).json(errors);
    }

    User.findOne({ email }).then(user => {
      // check if the user is already excsite
      if (user) {
        errors.email = "Email is already existe";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password,
          type: typeOfUser
        });

        // hash the user password before saving it to the database.
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            // save the user on the database with a hashed password.
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

// SIGNIN
router.post("/signin", ({ body: { email, password } }, res) => {
  const { errors, isValid } = validateSigninInput(email, password);
  // check validation.
  if (!isValid) {
    res.status(400).json(errors);
  }
  // find user by email
  User.findOne({ email }).then(user => {
    // check of this email is excite or no.
    if (!user) {
      errors.email = "Email not found";
      return res.status(404).json(errors);
    }

    // check if the password matches the one on the database.
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create a payload => we pass some user informations.
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 3600 * 24 * 7 },
          (err, token) => {
            res.json({
              seccess: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = "password is uncorrect";
        return res.status(404).json(errors);
      }
    });
  });
});

// JUST FOR TESTING
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  ({ user: { id, name, email, type } }, res) => {
    res.json({
      id,
      name,
      email,
      type
    });
  }
);

module.exports = router;
