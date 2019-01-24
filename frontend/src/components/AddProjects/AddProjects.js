import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { AddProject } from "../../actions/profileActions";
import TextFieldGroup from "../Common/TextFieldGroup";
import { AuthFormStyle } from "../../styles";

class AddProjects extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, description, image } = this.state;
    const projectData = {
      name,
      description,
      image
    };
    this.props.AddProject(projectData, this.props.history);
  };
  render() {
    const { name, description, image, errors } = this.state;
    return (
      <div className="container">
        <h1>Add Your Project</h1>
        <AuthFormStyle onSubmit={e => this.handleSubmit(e)}>
          <TextFieldGroup
            placeholder="The name of the project"
            name="name"
            value={name}
            onChange={this.handleChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="The description of the project"
            name="description"
            value={description}
            onChange={this.handleChange}
            error={errors.description}
          />
          <TextFieldGroup
            placeholder="The image of the project"
            name="image"
            value={image}
            onChange={this.handleChange}
            error={errors.image}
          />
          <button type="submit">Add</button>
        </AuthFormStyle>
      </div>
    );
  }
}

AddProjects.propTypes = {
  AddProject: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { AddProject }
)(withRouter(AddProjects));
