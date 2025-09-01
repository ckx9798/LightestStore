/** @format */

import { useEffect, useState } from "react";

export function useStore(store, selector) {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const listener = () => {
      const newSelectedState = selector(store.getState());
      setState(newSelectedState);
    };

    const unsubscribe = store.subscribe(listener);

    return unsubscribe;
  }, [store, selector]);

  return [state, store.setState];
}
