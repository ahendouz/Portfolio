const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("./../../models/User");

// GET
router.get("/test", (req, res) => res.json({ msg: "users works" }));

// POST
router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email is already existe" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/signin", ({ body: { email, password } }, res) => {
  // find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create a payload => "some user informations"
        const payload = { id: user.id, name: user.name };

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
        res.json({ password: "password is uncorrect" });
      }
    });
  });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  ({ user: { id, name, email } }, res) => {
    res.json({
      id,
      name,
      email
    });
  }
);

module.exports = router;
