import { createReducer } from "./utils";
import {
  RENDER_PAUSE,
  RENDER_PLAY,
  SET_SCENE,
  UPDATE_SHADER
} from "../constants";

const DEFAULT_STATE = {
  scene: null,
  shader: null,
  playing: false
};

export const rendering = createReducer(DEFAULT_STATE, {
  SET_SCENE: (state, { type, payload }) => ({
    ...state,
    scene: payload.scene,
    shader: payload.shader
  }),
  RENDER_PAUSE: (state, action) => ({ ...state, playing: false }),
  RENDER_PLAY: (state, action) => ({ ...state, playing: true }),
  UPDATE_SHADER: (state, action) => {
    //this is a hax, not returning a new state, but we're playing a reference game with WebGL here.
    const { key, value } = action.payload;

    //state.scene.children[0].material.uniforms[key].value = value;
    state.shader.uniforms[key].value = value;

    return state; 
  }
});
