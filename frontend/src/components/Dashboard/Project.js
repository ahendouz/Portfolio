import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteProject } from "../../actions/profileActions";

const Project = props => {
  const handleDelete = id => {
    console.log(id);
    props.deleteProject(id);
  };
  const { _id: id, name } = props;
  return (
    <div>
      {" "}
      Project: <span>{name}</span>{" "}
      <span onClick={() => handleDelete(id)}>X</span>
    </div>
  );
};

Project.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deleteProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProject }
)(Project);
