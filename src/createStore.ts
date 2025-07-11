/** @format */

export function createStore(createState) {
  let state;

  // 현재 state를 반환
  const getState = () => state;

  // 상태 생성
  state = createState(getState);

  return {
    getState,
  };
}
