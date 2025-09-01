/** @format */

import { useEffect, useState } from "react";

export function useStore(store) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const listener = () => setState(store.getState());

    const unsubscribe = store.subscribe(listener);

    return unsubscribe;
  }, [store]);

  return [state, setState];
}
