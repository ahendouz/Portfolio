const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatorProfileInput(
  handle,
  website,
  dribbble,
  github,
  skills
) {
  let errors = {};

  handle = !isEmpty(handle) ? handle : "";
  skills = !isEmpty(skills) ? skills : "";

  Validator.isEmpty(handle) && (errors.handle = "Profile handle is required");
  Validator.isEmpty(skills) && (errors.skills = "Profile skills is required");
  !isEmpty(website) &&
    !Validator.isURL(website) &&
    (errors.website = "Not valid URL");
  !isEmpty(dribbble) &&
    !Validator.isURL(dribbble) &&
    (errors.dribbble = "Not valid URL");
  !isEmpty(github) &&
    !Validator.isURL(github) &&
    (errors.github = "Not valid URL");

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
