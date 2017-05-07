import React from "react";
import * as actionCreators from "../actions/backgrounds";
import { connect } from "react-redux";
import Video from "./Video";

const Background = ({
  id,
  src,
  title,
  backgroundReady,
  backgroundRef,
  selectBackground
}) => {
  return (
    <div>

      <a href="#" onClick={_ => selectBackground(id)}>{title}</a>
      <Video
        src={src}
        onReady={_ => backgroundReady(id)}
        onRef={ref => backgroundRef(id, ref)}
      />
    </div>
  );
};

export default connect(undefined, actionCreators)(Background);
