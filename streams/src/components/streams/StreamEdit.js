import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
  componentDidMount() {
    //component renders twice
    //first fetches the stream and mapStateToProps attaches to

    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading....</div>;
    }

    return (
      <div>
        <h3>Edit A Stream</h3>
        {/* creating an object within initialValues props
        initialValues is a special prop passed to redux form(which envelopes streamform) 
        title and description are names of my field compoenents
        pass an object for each key checks if field exists and assign value(reduxform)
        pass only title and descroiption not id and userid as not really required to be updated
        (wont cause issue if passed)
        */}
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state.stream);
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
