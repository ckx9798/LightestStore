/** @format */

export function createStore(initializer) {
  let state;

  const listener = new Set();

  const getState = () => state;

  const setState = (updater) => {
    const newState = typeof updater === "function" ? updater(state) : updater;

    if (typeof state === "object" && typeof newState === "object") {
      state = { ...state, ...newState };
    } else {
      state = updater;
    }
  };

  const subscribe = (listener) => {
    listeners.add(listener);

    const unsubscribe = () => {
      listeners.delete(listener);
    };

    return unsubscribe;
  };

  state = typeof initializer === "function" ? initializer() : initializer;

  return {
    getState,
    setState,
    subscribe,
  };
}
