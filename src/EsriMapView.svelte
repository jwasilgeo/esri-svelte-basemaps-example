<script context="module">
  // this block of JS code only exists to optionally sync MapView extents

  // will provide access to all MapView instances at a later point
  let allViews = [];

  // will provide access to a MapView property watcher at a later point
  let currentViewWatcher;
</script>

<script>
  import { onMount } from 'svelte';
  import { loadModules } from 'esri-loader';

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
      MapView
    ] = await loadModules([
      'esri/Map',
      'esri/views/MapView'
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
      // add this MapView to the shared array
      allViews.push(view);

      view.on('pointer-enter', () => {
        // when a pointer enters or when a touch begins:
        // 1. remove an existing currentViewWatcher bound to a different MapView
        // 2. establish a new currentViewWatcher for this MapView,
        //    which will update the extent and rotation of all other MapViews

        if (currentViewWatcher && currentViewWatcher.remove) {
          currentViewWatcher.remove();
        }

        if (!syncExtents) {
          return;
        }

        currentViewWatcher = view.watch('extent', (newExtent) => {
          allViews
            // filter to get only the other MapViews that are not being interacted with
            .filter((otherView) => otherView.container !== view.container)
            .forEach((otherView) => {
              // update the extent of the other MapViews based on the current MapView being interacted with
              otherView.extent = newExtent;

              // also update the other MapViews' rotation to match the current MapView's rotation
              if (otherView.rotation !== view.rotation) {
                otherView.rotation = view.rotation;
              }
            });
        });
      });
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
