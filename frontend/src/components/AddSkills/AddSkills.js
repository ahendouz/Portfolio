import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { AddSkill } from "../../actions/profileActions";
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

  handleSubmit = e => {
    e.preventDefault();
    const { name, description, image } = this.state;
    const skillData = {
      name,
      description,
      image
    };
    this.props.AddSkill(skillData, this.props.history);
  };
  render() {
    const { name, description, image, errors } = this.state;
    return (
      <div className="container">
        <h1>Add Your skill</h1>
        <AuthFormStyle onSubmit={e => this.handleSubmit(e)}>
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
          <button type="submit">Add</button>
        </AuthFormStyle>
      </div>
    );
  }
}

AddSkills.propTypes = {
  AddSkill: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { AddSkill }
)(withRouter(AddSkills));
