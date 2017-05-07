import React from "react";
import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  WebGLRenderer,
  LinearFilter,
  RGBFormat,
  VideoTexture,
  ShaderMaterial,
  Mesh
} from "three";
import { connect } from "react-redux";
import fragmentShader from "../shaders/fragment/default";
import vertexShader from "../shaders/vertex/default";

class Renderer extends React.Component {
  constructor(props) {
    super(props);

    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.z = 5;

    this.state = {
      playing: false
    }
  }

  componentDidMount() {
    // TODO: MOVE THE SCENE GRAPH INIT CODE TO AN ACTION CREATOR
    this.renderer = new WebGLRenderer({ canvas: this.canvas });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.update();
  }

  update() {
    const { scene, playing } = this.props.rendering;
    
    if (scene && playing) {
      requestAnimationFrame(this.update.bind(this));  
      this.renderer.render(scene, this.camera);
    }
    
  }

  componentWillReceiveProps(newProps) {
    const { rendering } = newProps;
    
    if (this.state.playing !== rendering.playing) {
      this.setState({ playing: rendering.playing });
    }
  }

  render() {
    const { ui } = this.props;
    if (this.state.playing) {
      this.update(); 
    }
    return <canvas ref={ref => (this.canvas = ref)} />;
  }
}

export default connect(state => ({ ui: state.ui, rendering: state.rendering }))(
  Renderer
);
