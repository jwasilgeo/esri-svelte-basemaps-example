<script>
  import { onMount } from 'svelte';
  import { loadModules } from 'esri-loader';
  import { storeExtent } from './stores.js';

  // props with default values
  export let basemap = 'streets';
  export let center = [0, 0];
  export let scale = 295828763;

  // this prop helps to optionally sync MapView extents
  export let syncExtents;

  // reference to DOM node where the MapView will be created
  let container;

  onMount(async () => {
    const options = {
      version: '4.14',
      css: true
    };

    const [
      EsriMap,
      MapView,
      watchUtils
    ] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/core/watchUtils'
    ], options);

    const view = new MapView({
      container,
      map: new EsriMap({
        basemap
      }),
      center,
      scale,
      ui: {
        components: ['attribution', 'zoom', 'compass']
      }
    });

    // the rest of this JS code only exists to optionally sync MapView extents
    view.when(() => {
      let firstRun = true;
      watchUtils.whenTrue(view, "stationary", newExtent => {
        // Do not set the extent the first time the map loads:
        if (firstRun) {
          firstRun = false;
        } else {
          // Set the store with the extent
          storeExtent.set(view.extent);
        }
      });
    });

    // Every time the store is updated, update this map's extent to match what is in the store.
    storeExtent.subscribe(newExtent => {
      if (syncExtents && newExtent) {
        view.extent = newExtent;
      }
    });
  });
</script>

<div bind:this={container}></div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
