/** @format */

// counterStore.js
import { createStore } from "../store";

export const counterStore = createStore((set, get) => ({
  count: 0,
  increase: () => set({ count: get().count + 1 }),
}));
