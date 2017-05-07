import {
  BACKGROUND_READY,
  SELECT_BACKGROUND,
  BACKGROUND_REF
} from "../constants";

import { createChromaScene } from "./rendering";

export function backgroundReady(id) {
  return {
    type: BACKGROUND_READY,
    payload: id
  };
}

export function selectBackground(id) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_BACKGROUND,
      payload: id
    });

    const { rendering, ui, backgrounds } = getState();

    const selectedBackground = backgrounds.find(b => b.selected);

    if (ui.videoSource) {
      dispatch(
        createChromaScene(ui.videoSource, selectedBackground.ref, [1.0, 1.0, 1.0, 1.0])
      );
    }
  };
}

export function backgroundRef(id, ref) {
  return {
    type: BACKGROUND_REF,
    payload: {
      id,
      ref
    }
  };
}
