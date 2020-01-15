// https://svelte.dev/tutorial/writable-stores
import { writable } from "svelte/store";

export const storeExtentInfo = writable({
  extent: null,
  rotation: null
});

export const storeSyncExtents = writable(true);
