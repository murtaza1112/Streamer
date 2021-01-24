import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderError({ touched, error }) {
    // console.log(touched, error);
    if (touched && error) {
      return (
        <div
          class="ui pointing above prompt label"
          role="alert"
          aria-atomic="true"
        >
          {error}
        </div>
      );
    }
  }
  renderInput = (formProps) => {
    //console.log(formProps);
    const { meta, label } = formProps;
    //console.log(meta);
    const { error, touched } = meta;
    var className = `field ${error && touched ? "error" : ""}`;
    return (
      <div class={className}>
        <label>{label}</label>
        <div class="ui fluid input">
          <input {...formProps.input} placeholder={label} />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    //if an unknown prop added to Field it will just be passed as props to the component, ex-label
    return ( 
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui green button">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  var errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title.";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description.";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamForm",
  validate,
})(StreamCreate);

export default formWrapped;
