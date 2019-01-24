import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../Common/TextFieldGroup";
import { AuthFormStyle } from "../../styles";

class AddSkills extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { name, description, image } = this.state;
    const skillData = {
      name,
      description,
      image
    };
  };
  render() {
    const { name, description, image, errors } = this.state;
    return (
      <div className="container">
        <h1>Add Your skill</h1>
        <AuthFormStyle>
          <TextFieldGroup
            placeholder="The name of the skill"
            name="name"
            value={name}
            onChange={this.handleChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="The description of the skill"
            name="description"
            value={description}
            onChange={this.handleChange}
            error={errors.description}
          />
          <TextFieldGroup
            placeholder="The image of the skill"
            name="image"
            value={image}
            onChange={this.handleChange}
            error={errors.image}
          />
        </AuthFormStyle>
      </div>
    );
  }
}

AddSkills.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(AddSkills);
