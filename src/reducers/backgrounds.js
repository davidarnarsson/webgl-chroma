import { createId, createReducer, doIf } from "./utils";
import {
  ADD_BACKGROUND,
  SELECT_BACKGROUND,
  BACKGROUND_READY,
  RENDER_PLAY,
  RENDER_PAUSE,
  BACKGROUND_REF
} from "../constants";

export const backgrounds = createReducer([], {
  ADD_BACKGROUND: (state, action) => [...state, background(undefined, action)],
  SELECT_BACKGROUND: (state, action) => state.map(b => background(b, action)),
  BACKGROUND_READY: (state, action) => state.map(b => background(b, action)),
  BACKGROUND_REF: (state, action) => state.map(b => background(b, action)),
  RENDER_PAUSE: (state, action)  => state.map(b => background(b, action)),
  RENDER_PLAY: (state, action)  => state.map(b => background(b, action))
});

export const background = createReducer(
  {
    selected: false,
    id: null,
    title: null,
    ready: false,
    src: null,
    ref: null
  },
  {
    ADD_BACKGROUND: (state, action) => {
      const { src, title } = action.payload;
      const id = createId();
      return {
        selected: false,
        src,
        title,
        id,
        ready: false
      };
    },
    SELECT_BACKGROUND: (state, action) => ({
      ...doIf(
        state,
        x => x.id === action.payload,
        x => (x.selected = true),
        x => (x.selected = false)
      )
    }),
    BACKGROUND_READY: (state, action) => ({
      ...doIf(state, x => x.id === action.payload, x => (x.ready = true))
    }),
    BACKGROUND_REF: (state, action) => ({
      ...doIf(state, x => x.id === action.payload.id, x => (x.ref = action.payload.ref))
    }),
    RENDER_PAUSE: (state, action) => {
      if (state.ref) {
        state.ref.pause();
      }
      return {...state};
    },
    RENDER_PLAY: (state, action) => {
      
      if (state.selected && state.ref) {
        state.ref.play(); 
      }
      return {...state};
    }
  }
);
