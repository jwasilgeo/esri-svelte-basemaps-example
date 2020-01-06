<script>
  import { onMount } from 'svelte';
  import { loadModules } from 'esri-loader';

  let container;

  // props with default values
  export let basemap = 'streets';
  export let center = [0, 0];
  export let scale = 295828763;

  onMount(async () => {
    const options = {
      version: '4.14',
      css: true
    };

    const [
      Map,
      MapView
    ] = await loadModules([
      'esri/Map',
      'esri/views/MapView'
    ], options);

    new MapView({
      container,
      map: new Map({
        basemap
      }),
      center,
      scale
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
