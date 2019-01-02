const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatorPostInput(text) {
  let errors = {};

  text = !isEmpty(text) ? text : "";

  if (!Validator.isLength(text, { max: 100 })) {
    errors.text = "your text is too long";
  }
  if (Validator.isEmpty(text)) {
    errors.text = "Text feild is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
