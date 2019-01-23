import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../Common/TextFieldGroup";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { AuthFormStyle } from "../../styles";
import { isEmpty } from "../../validation/isEmpty";

class EditProfile extends Component {
  state = {
    handle: "",
    website: "",
    social: "",
    bio: "",
    typeOfUser: undefined,
    errors: {}
  };

  componentDidMount = () => {
    this.props.getCurrentProfile();
    const { typeOfUser } = this.props;
    this.setState({ typeOfUser });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handle, website, bio, social, typeOfUser } = this.state;
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
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      console.log(nextProps);
      // Bring skills array back to CSV
      //   const skillsCSV = profile.skills.join(",");
      // If profile field doesnt exist, make empty string
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      if (this.state.typeOfUser === "designer") {
        profile.social = !isEmpty(profile.dribbble) ? profile.dribbble : "";
      } else {
        profile.social = !isEmpty(profile.github) ? profile.github : "";
      }
      this.setState({
        handle: profile.handle,
        bio: profile.bio,
        website: profile.website,
        social: profile.social
      });
    }
  };

  render() {
    const { errors, handle, website, social, bio } = this.state;
    const { typeOfUser } = this.props;
    return (
      <div className="container">
        <h1>Edit Your Profile</h1>
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

EditProfile.propTypes = {
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
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
