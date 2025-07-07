/** @format */

export function createStore(createStateFn) {
  let state;
  const listeners = new Set();

  const setState = (partial) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    const prevState = state;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener(state, prevState));
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // 초기화
  state = createStateFn(setState, getState);

  return { setState, getState, subscribe };
}
