import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  actions() {
    // adding a div here to enclose the two button causes styling issues
    // so to bypass this issue , use <React.fragments> as they dont add an
    // addtional div in the dom
    //<React.Frament> can also be written as <></>

    // both of the following are incorrect implementations
    // onClick={this.props.deleteStream(id)} called immediately when component rendered
    // onClick={this.props.deleteStream} not invoked with the id param

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }
  onDismiss() {
    return history.push("/");
  }
  renderContent = () => {
    // console.log(this.props);
    if (!this.props.stream) {
      return <div>Are You Sure You Want To Delete This Stream?</div>;
    }
    return (
      <div>
        Are You Sure You Want To Delete the stream: {this.props.stream.title}?
      </div>
    );
  };

  render() {
    //entireyl possible that the stream has not yet been fetched and
    //first entire screen loads one time then compoenet Did mount called
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <Modal
        title="Delete Stream"
        actions={this.actions()}
        content={this.renderContent()}
        onDismiss={this.onDismiss}
      ></Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
