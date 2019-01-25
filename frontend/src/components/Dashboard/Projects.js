import React from "react";
import Project from "./Project";
import PropTypes from "prop-types";

const Projects = ({ projects }) => {
  return (
    <div>
      {projects.map(project => (
        <Project key={project._id} {...project} />
      ))}
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.array.isRequired
};

export default Projects;
