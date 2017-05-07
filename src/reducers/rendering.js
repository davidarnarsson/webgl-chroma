import { createReducer } from './utils'
import { 
  RENDER_PAUSE,
  RENDER_PLAY,
  SET_SCENE
} from '../constants'


const DEFAULT_STATE = {
  scene: null, 
  playing: false
}

export const rendering = createReducer(DEFAULT_STATE, {
  SET_SCENE: (state, action) => ({...state, scene: action.payload }),
  RENDER_PAUSE: (state, action) => ({...state, playing: false }),
  RENDER_PLAY: (state, action) => ({...state, playing: true })
});