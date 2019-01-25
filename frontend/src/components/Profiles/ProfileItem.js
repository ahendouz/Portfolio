import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "../../validation/isEmpty";

class ProfileItem extends Component {
  render() {
    const { user } = this.props;

    return (
      <div style={{ background: "aquamarine" }}>
        Profile item
        <div>
          <div>
            <img src={user.avatar} alt="" />
          </div>
          <div>
            <h3>{user.name}</h3>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileItem;
