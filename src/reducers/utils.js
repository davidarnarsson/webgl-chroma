export function createReducer(defaultState, handlers) {
  return (state = defaultState, action) => {
    const handler = handlers[action.type];
    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}

export function doIf(
  obj,
  predicate,
  applierTrue = x => x,
  applierFalse = x => x
) {
  predicate(obj) ? applierTrue(obj) : applierFalse(obj);
  return obj;
}

let ID = 0;
export function createId() {
  return ID++;
}
