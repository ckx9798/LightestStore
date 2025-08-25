/** @format */

export function createStore(initializer) {
  let state;

  const getState = () => state;

  const setState = (updater) => {
    const newState = typeof updater === "function" ? updater(state) : updater;

    state = newState;
  };

  state = typeof initializer === "function" ? initializer() : initializer;

  return {
    getState,
    setState,
  };
}
