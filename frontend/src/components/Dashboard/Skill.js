import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteSkill } from "../../actions/profileActions";

const Skill = props => {
  const handleDelete = id => {
    props.deleteSkill(id);
  };
  const { _id: id, name } = props;
  return (
    <div>
      <span>{name}</span> <span onClick={() => handleDelete(id)}>X</span>
    </div>
  );
};

Skill.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deleteSkill: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSkill }
)(Skill);
