const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validationSkillInput(name, description, image) {
  let errors = {};
  name = !isEmpty(name) ? name : "";
  description = !isEmpty(description) ? description : "";
  image = !isEmpty(image) ? image : "";

  Validator.isEmpty(name) && (errors.name = "name is required");
  Validator.isEmpty(description) &&
    (errors.description = "description is required");
  Validator.isEmpty(image) && (errors.image = "image is required");

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
