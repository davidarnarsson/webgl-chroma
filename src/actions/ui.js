import {
  VIDEO_ERROR,
  VIDEO_SOURCE
} from '../constants'

import { createSimpleScene, play } from './rendering'

export function videoError(err) {
  return {
    type: VIDEO_ERROR,
    payload: err
  }
}

export function videoSource(src) {

  return (dispatch, getStore) => {
    dispatch({
      type: VIDEO_SOURCE,
      payload: src
    });

    const { rendering, ui } = getStore();

    dispatch(createSimpleScene(src));
    dispatch(play());
  }
  
}