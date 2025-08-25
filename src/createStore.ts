/** @format */

export function createStore(initializer) {
  let state;
  const getState = () => state;

  const setState = (updater) => {
    const newState = typeof updater === "function" ? updater(state) : updater;

    if (typeof state === "object" && typeof newState === "object") {
      state = { ...state, ...newState };
    } else {
      state = updater;
    }
  };

  state = typeof initializer === "function" ? initializer() : initializer;

  return {
    getState,
    setState,
  };
}
