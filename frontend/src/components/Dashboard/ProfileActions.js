import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn">
        Edit Profile
      </Link>
      <Link to="/add-skills" className="btn">
        Add Skills
      </Link>
      <Link to="/add-projects" className="btn">
        Add Projects
      </Link>
    </div>
  );
};

export default ProfileActions;
