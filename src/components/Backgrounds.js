import Background from './Background';
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/rendering";

const Backgrounds = ({ ui, backgrounds, createSobelScene }) => {
  return (
    <div>
      {backgrounds.map(x => <Background key={x.id} {...x} />)}
      <a onClick={_ => createSobelScene(ui.videoSource)}>Sobel</a>
    </div>
  );
};

export default connect(({ backgrounds, ui }) => ({ backgrounds, ui }), actionCreators)(
  Backgrounds
);
