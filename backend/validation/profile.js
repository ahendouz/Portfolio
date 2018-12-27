const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatorProfileInput(
  handle,
  bio,
  website,
  social,
  type
) {
  let errors = {};

  handle = !isEmpty(handle) ? handle : "";
  social = !isEmpty(social) ? social : "";

  Validator.isEmpty(handle) && (errors.handle = "Profile handle is required");
  Validator.isEmpty(bio) && (errors.bio = "Please add your bio");
  Validator.isEmpty(social) &&
    (errors.social = `Please add your ${
      type === "designer" ? "dribbble" : "github"
    } accont`);

  !isEmpty(website) &&
    !Validator.isURL(website) &&
    (errors.website = "Not valid URL");
  !isEmpty(social) &&
    !Validator.isURL(social) &&
    (errors.social = "Not valid URL");

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
