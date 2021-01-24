import React from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
import flv from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidUpdate() {
    this.buildPlayer();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  // the point of buildplayer function is tht sometimes the componentDidMount
  // executes faster than the stream obtained this causes error in player
  // as ref is never created , so a compnentdidupdate lifecycle is required

  buildPlayer() {
    if (this.player || !this.props.stream) return;
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }
  componentWillUnmount(){
    this.player.destroy();
  }

  render() {
    console.log("dsad");
    if (!this.props.stream) return <div>Loading...</div>;

    // main purpose of flv is to similair to axios fetches data and serves on the screen
    //using flash video player as easiest to use
    return (
      <div >
        <br/>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{this.props.stream.title}</h1>
        <h3>{this.props.stream.description}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
