import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';

class StreamCreate extends Component {
  // created this function to handle errors based off the meta prop from the react-form
  renderError({ error, touched }) {
    // destructured out of meta
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // turned this into an arrow function to fix the context of this not referencing the renderError() function
  renderInput = ({ input, label, meta }) => {
    // destructure out the input variable
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  // calls all of redux-forms submit properties
  onSubmit(formValues) {
    // event.preventDefault(); redux-form takes care of this
    console.log(formValues);
  }

  render() {
    console.log(this.props); // see all the props of redux-form
    return (
      // calls the onSubmit function above through redux-forms handleSubmit function
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label={`Enter Title`} />
        <Field name="description" component={this.renderInput} label={`Enter Description`} />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// if the errors.(value) matches the name attribute in the Field above it will render that error input
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

// pass in similar to redux connect component
export default reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);
