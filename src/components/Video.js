import React from "react";

export default class Video extends React.Component {
  componentDidMount() {
    this.props.onRef(this.videoRef);
  }
  render() {
    const { src, onReady, autoplay } = this.props;

    return (
      <video
        ref={x => (this.videoRef = x)}
        onCanPlay={onReady}
        autoPlay={autoplay}
        preload={true}
        src={src}
      />
    );
  }
}
