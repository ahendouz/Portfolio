import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../Common/Spinner";
import { DashboardStyle } from "../../styles";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDelete = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p>
              Welcome{" "}
              <Link
                to={`/profile/${profile.handle}`}
                style={{ color: "tomato" }}
              >
                {user.name}
              </Link>
            </p>
            <ProfileActions />
            {/* <Skills skills={profile.skills} /> */}
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.handleDelete} className="btn">
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p>Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <DashboardStyle className="container">
        <h1>Dashboard</h1>
        {dashboardContent}
      </DashboardStyle>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
