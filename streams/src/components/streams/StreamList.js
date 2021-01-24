import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated links">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.stream.map((elem) => {
      return (
        <div className="item" key={elem.id}>
          {/* //place above as semantic styling not covering down */}
          {this.renderAdmin(elem)}
          <i className="large middle aligned icon camera"></i>
          <div className="content">
            <Link to={`/streams/${elem.id}`}>
            {elem.title}
            </Link>
            <div className="description">{elem.description}</div>
          </div>
        </div>
      );
    });
  }
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            CreateStream
          </Link>
        </div>
      );
    }
  }
  render() {
    // console.log(this.props.stream);
    return (
      <div>
        <h1>Stream</h1>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

//return array from an object
const mapStateToProps = ({ stream, auth }) => {
  return {
    stream: Object.values(stream),
    currentUserId: auth.userId,
    isSignedIn: auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
