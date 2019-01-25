import React from "react";
import Skill from "./Skill";
import PropTypes from "prop-types";

const Skills = ({ skills }) => {
  return (
    <div>
      {skills.map(skill => (
        <Skill key={skill._id} {...skill} />
      ))}
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.array.isRequired
};

export default Skills;
