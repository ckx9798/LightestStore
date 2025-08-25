/** @format */

export function TcreateStore(initializer) {
  let state;

  const getState = () => state;

  if (typeof initializer === "function") {
    state = initializer();
  } else {
    state = initializer;
  }

  return {
    getState,
  };
}
