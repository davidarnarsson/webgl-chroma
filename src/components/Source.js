import React from "react";
import * as actionCreators from "../actions/ui";
import { connect } from "react-redux";

class Source extends React.Component {
  constructor() {
    super();

    this.handleVideo = this.handleVideo.bind(this);
    this.videoError = this.videoError.bind(this);
  }

  handleVideo(stream) {
    this.ref.src = window.URL.createObjectURL(stream);
    
    const { videoSource } = this.props;

    videoSource(this.ref);
  }

  videoError(err) {
    const { videoError } = this.props;

    videoError(err);
  }

  componentDidMount() {
    /*if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        this.handleVideo,
        this.videoError
      );
    }*/
  }

  onReady() {
    const { videoSource } = this.props;
    this.ref.volume = 0;
    videoSource(this.ref);
  }

  render() {
    return <video autoPlay={true} loop={true} onCanPlay={this.onReady.bind(this)} ref={r => (this.ref = r)} src="/assets/video.mp4" />;
  }
}

export default connect(undefined, actionCreators)(Source);
