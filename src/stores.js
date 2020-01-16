// https://svelte.dev/tutorial/writable-stores
// https://svelte.dev/docs#writable

import { writable } from "svelte/store";

export const storeExtentInfo = writable({
  extent: null,
  rotation: null
});

export const storeSyncExtentsEnabled = writable(true);
