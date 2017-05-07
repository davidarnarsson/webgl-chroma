import React from "react";
import s from "./App.css";
import Backgrounds from "./Backgrounds";
import Source from "./Source";
import Renderer from "./Renderer";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div>
        <Backgrounds />
        <Source />
        <Renderer />

      </div>
    );
  }
}

export default connect()(App);
