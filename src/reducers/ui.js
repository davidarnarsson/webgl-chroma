import { createReducer } from "./utils";
import { VIDEO_SOURCE, VIDEO_ERROR } from "../constants";
const DEFAULT_STATE = {
  recording: false,
  recordTime: null,
  uploading: false,
  videoSource: null,
  videoError: null
};

export const ui = createReducer(DEFAULT_STATE, {
  VIDEO_SOURCE: (state, action) => ({ ...state, videoSource: action.payload }),
  VIDEO_ERROR: (state, action) => ({...state, videoError: action.payload })
});
