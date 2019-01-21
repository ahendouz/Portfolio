import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import { createProfile } from "../../actions/profileActions";
import { AuthFormStyle } from "../../styles";

class CreateProfile extends Component {
  state = {
    handle: "",
    website: "",
    github: "",
    dribbble: "",
    bio: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handle, website, bio, github, dribbble } = this.state;
    const profileData = { handle, website, bio, github, dribbble };
    this.props.createProfile(profileData, this.props.history);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;
    const { typeOfUser } = this.props;
    return (
      <div className="container">
        <h1>Create Your Profile</h1>
        <AuthFormStyle onSubmit={this.handleSubmit}>
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.handleChange}
            error={errors.handle}
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            value={this.state.website}
            onChange={this.handleChange}
            error={errors.website}
          />
          {typeOfUser === "designer" ? (
            <TextFieldGroup
              placeholder="Dribbble Username"
              name="dribbble"
              value={this.state.dribbble}
              onChange={this.handleChange}
              error={errors.dribbble}
            />
          ) : (
            <TextFieldGroup
              placeholder="Github Username"
              name="github"
              value={this.state.github}
              onChange={this.handleChange}
              error={errors.github}
            />
          )}
          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.handleChange}
            error={errors.bio}
          />
          <input type="submit" value="Submit" />
        </AuthFormStyle>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  typeOfUser: state.auth.user.type
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
