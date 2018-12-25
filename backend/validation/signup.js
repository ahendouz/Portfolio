const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateSignupInput(
  name,
  email,
  password,
  password2,
  typeOfUser
) {
  let errors = {};

  // convert empty value into empty string because validator only accept strings
  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";
  typeOfUser = !isEmpty(typeOfUser) ? typeOfUser : "";

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }
  
  if (Validator.isEmpty(typeOfUser)) {
    errors.typeOfUser = "Type is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
