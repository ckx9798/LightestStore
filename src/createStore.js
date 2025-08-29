/** @format */

export function createStore(initializer) {
  let state;

  const listeners = new Set();

  const getState = () => state;

  const setState = (updater) => {
    const newState = typeof updater === "function" ? updater(state) : updater;

    let nextState;

    if (typeof state === "object" && typeof newState === "object") {
      nextState = { ...state, ...newState };
    } else {
      nextState = newState;
    }

    if (!Object.is(state, nextState)) {
      state = nextState;
      listeners.forEach((listener) => listener());
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
