import React from "react";
import {
  Scene,
  Vector4,
  OrthographicCamera,
  BoxGeometry,
  WebGLRenderer,
  LinearFilter,
  RGBFormat,
  VideoTexture,
  WebGLRenderTarget,
  ShaderMaterial,
  Mesh
} from "three";
import { connect } from "react-redux";
import fragmentShader from "../shaders/fragment/default";
import vertexShader from "../shaders/vertex/default";
import * as actionCreators from "../actions/rendering";

class Renderer extends React.Component {
  constructor(props) {
    super(props);

    this.camera = new OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      100
    );

    this.camera.position.z = 1;

    this.state = {
      playing: false
    };
  }

  componentDidMount() {
    // TODO: MOVE THE SCENE GRAPH INIT CODE TO AN ACTION CREATOR
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.update();
  }

  update() {
    const { scene, playing } = this.props.rendering;

    if (scene && playing) {
      requestAnimationFrame(this.update.bind(this));
      this.renderer.render(scene, this.camera, this.renderTarget);
      this.renderer.render(scene, this.camera);
    }
  }

  componentWillReceiveProps(newProps) {
    const { rendering } = newProps;

    if (this.state.playing !== rendering.playing) {
      this.setState({ playing: rendering.playing });
    }
  }

  performShaderUpdate(x, y) {
    var buf = new Uint8Array(4);
    this.renderer.readRenderTargetPixels(
      this.renderTarget,
      x,
      y,
      1,
      1,
      buf
    );
    const { updateShader } = this.props;
    updateShader(
      "chroma",
      new Vector4(
        buf[0] / 255.0,
        buf[1] / 255.0,
        buf[2] / 255.0,
        buf[3] / 255.0
      )
    );
  }

  onMouseUp(e) {
    const { clientX, clientY } = e; 
    this.performShaderUpdate(clientX, clientY);
  }

  onTouchEnd(e) {
    
    if (e.changedTouches.length) {
      const { clientX, clientY } = e.changedTouches[0];
      this.performShaderUpdate(clientX, clientY);
    }
  }

  render() {
    const { ui } = this.props;
    if (this.state.playing) {
      this.update();
    }
    return (
      <canvas
        onMouseUp={this.onMouseUp.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
        ref={ref => (this.canvas = ref)}
      />
    );
  }
}

export default connect(
  state => ({ ui: state.ui, rendering: state.rendering }),
  actionCreators
)(Renderer);
