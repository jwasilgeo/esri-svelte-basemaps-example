<script>
  // this <Card> component helps to organize:
  // - the basemap title
  // - an <EsriMapView> component instance
  // - and a link to help the user go back up

  import EsriMapView from './EsriMapView.svelte';

  export let basemap;
  export let center;
  export let scale;
</script>

<div class="card">
  <p id={basemap} class="basemap-title">{basemap}</p>

  <div class="esri-map-view-wrapper">
    <EsriMapView basemap={basemap} center={center} scale={scale}></EsriMapView>
  </div>

  <div class="top-link">
    <a href="#top">go to top ↑</a>
  </div>
</div>

<style>
  .card {
    margin: 15px auto;
  }

  .basemap-title {
		margin: 0 0 5px 0;
    font-weight: bold;
	}

	.esri-map-view-wrapper {
		height: 200px;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
	}

	.top-link {
		font-style: italic;
		font-size: 0.9em;
		text-align: right;
		margin: 2px 0 0 0;
	}
</style>
