import createDefaultShader from "../shaders/default";
import createChromaShader from "../shaders/chroma";
import createSobelShader from "../shaders/sobel";

import { SET_SCENE, RENDER_PAUSE, RENDER_PLAY } from "../constants";
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

function createShaderScene(shader) {
  const scene = new Scene();

  const geometry = new BoxGeometry(15, 8, 0);
  const material = new ShaderMaterial(shader);

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  return scene;
}

export function createSimpleScene(videoSource) {
  return (dispatch, getState) => {
    dispatch(pause());

    const scene = createShaderScene(createDefaultShader(videoSource));

    dispatch(setScene(scene));

    dispatch(play());
  };
}

export function createChromaScene(source, background, key) {
  return (dispatch, getState) => {
    dispatch(pause());

    const scene = createShaderScene(
      createChromaShader(source, background, key)
    );

    dispatch(setScene(scene));

    dispatch(play());
  };
}

export function createSobelScene(source) {
  return (dispatch, getState) => {
    dispatch(pause());
    const scene = createShaderScene(
      createSobelShader(source, source.videoWidth, source.videoHeight)
    );
    dispatch(setScene(scene));
    dispatch(play());
  };
}

export function setScene(scene) {
  return {
    type: SET_SCENE,
    payload: scene
  };
}

export function play() {
  return {
    type: RENDER_PLAY
  };
}

export function pause() {
  return {
    type: RENDER_PAUSE
  };
}
