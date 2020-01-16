<script>
  // the <EsriMapView> component:
  // - creates a MapView instance with optional props (basemap, center, scale)
  // - syncs extents and rotations among other MapView instances

  import { onMount } from 'svelte';
  import { loadModules } from 'esri-loader';
  import { storeExtentInfo, storeSyncExtentsEnabled } from './stores.js';

  // props with default values in case none are passed in by a parent
  export let basemap = 'streets';
  export let center = [0, 0];
  export let scale = 295828763;

  // reference to the DOM node where this MapView instance will be created
  // see "bind:this={viewContainer}" below
  let viewContainer;

  // use "onMount" in the Svelte component lifecycle to create a MapView instance
  onMount(async () => {
    // set Esri JSAPI options
    const options = {
      version: '4.14',
      css: true
    };

    // load Esri JSAPI modules
    const [
      EsriMap,
      MapView,
      watchUtils
    ] = await loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/core/watchUtils'
    ], options);

    // construct a MapView instance
    const view = new MapView({
      container: viewContainer,
      map: new EsriMap({
        basemap
      }),
      center,
      scale,
      ui: {
        // add the compass widget which is not standard for a MapView
        components: ['attribution', 'zoom', 'compass']
      }
    });

    // the rest of this JS code only exists to optionally sync MapView instance extents and rotations
    view.when(() => {
      let firstRun = true;
      watchUtils.whenTrue(view, 'stationary', newExtent => {
        // do not set the extent or rotation the first time the MapView loads
        if (firstRun) {
          firstRun = false;
        } else {
          // set the store with the extent and rotation
          storeExtentInfo.set({
            extent: view.extent,
            rotation: view.rotation
          });
        }
      });
    });

    // every time the store is updated, set this MapView instance's extent
    // and rotation to match what is in the store
    storeExtentInfo.subscribe(extentInfo => {
      if ($storeSyncExtentsEnabled) {
        view.extent = extentInfo.extent;
        view.rotation = extentInfo.rotation;
      }
    });

    // when the sync extents option is checked on again,
    // sync the MapView instances with the latest store information
    storeSyncExtentsEnabled.subscribe(syncExtentsEnabled => {
      if (syncExtentsEnabled) {
        view.extent = $storeExtentInfo.extent;
        view.rotation = $storeExtentInfo.rotation;
      }
    });
  });

</script>

<div bind:this={viewContainer}></div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
