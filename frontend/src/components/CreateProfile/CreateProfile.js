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
    social: "",
    bio: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { typeOfUser } = this.props;
    e.preventDefault();
    const { handle, website, bio, social } = this.state;
    let profileData;
    if (typeOfUser === "designer") {
      profileData = { handle, website, bio, dribbble: social };
    } else {
      profileData = { handle, website, bio, github: social };
    }
    this.props.createProfile(profileData, this.props.history);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors, handle, website, social, bio } = this.state;

    const { typeOfUser } = this.props;
    return (
      <div className="container">
        <h1>Create Your Profile</h1>
        <AuthFormStyle onSubmit={this.handleSubmit}>
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            value={handle}
            onChange={this.handleChange}
            error={errors.handle}
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            value={website}
            onChange={this.handleChange}
            error={errors.website}
          />
          {typeOfUser === "designer" ? (
            <TextFieldGroup
              placeholder="Dribbble Username"
              name="social"
              value={social}
              onChange={this.handleChange}
              error={errors.social}
            />
          ) : (
            <TextFieldGroup
              placeholder="Github Username"
              name="social"
              value={social}
              onChange={this.handleChange}
              error={errors.social}
            />
          )}
          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={bio}
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
