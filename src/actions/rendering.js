import createDefaultShader from "../shaders/default";
import createChromaShader from "../shaders/chroma";
import createSobelShader from "../shaders/sobel";

import {
  SET_SCENE,
  UPDATE_SHADER,
  RENDER_PAUSE,
  RENDER_PLAY
} from "../constants";
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

  const geometry = new BoxGeometry(window.innerWidth, window.innerHeight, 0);
  const material = new ShaderMaterial(shader);

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  return scene;
}

export function createSimpleScene(videoSource) {
  return (dispatch, getState) => {
    dispatch(pause());

    const shader = createDefaultShader(videoSource);
    const scene = createShaderScene(shader);

    dispatch(setScene(scene, shader));

    dispatch(play());
  };
}

export function createChromaScene(source, background, key) {
  return (dispatch, getState) => {
    dispatch(pause());

    const shader = createChromaShader(source, background, key);
    const scene = createShaderScene(shader);

    dispatch(setScene(scene, shader));

    dispatch(play());
  };
}

export function createSobelScene(source) {
  return (dispatch, getState) => {
    dispatch(pause());
    const shader = createSobelShader(
      source,
      source.videoWidth,
      source.videoHeight
    );
    const scene = createShaderScene(shader);
    dispatch(setScene(scene, shader));
    dispatch(play());
  };
}

export function updateShader(key, value) {
  return {
    type: UPDATE_SHADER,
    payload: {
      key,
      value
    }
  };
}

export function setScene(scene, shader) {
  return {
    type: SET_SCENE,
    payload: {
      scene,
      shader
    }
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
