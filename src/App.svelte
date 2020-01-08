<script>
	import Card from './Card.svelte';

	export let title;
  export let subtitle;

  // use the same center and scale for each <EsriMapView>
  export let demoCenter = [-59.5, -51.85];
  export let demoScale = 4622324;

  // optionally sync MapView extents by binding a Boolean value to a checkbox
  // and passing the value down to the <EsriMapView> children components
  let syncExtents = true;
  const syncExtentsLabel = 'Sync Extent and Rotation?';

  // use a unique raster basemap for each <EsriMapView>
	const rasterBasemaps = [
		'topo',
		'streets',
		'satellite',
		'hybrid',
		'dark-gray',
		'gray',
		'national-geographic',
		'oceans',
		'osm',
		'terrain'
	];

  // use a unique vector basemap for each <EsriMapView>
	const vectorBasemaps = [
		'dark-gray-vector',
		'gray-vector',
		'streets-vector',
		'streets-night-vector',
		'streets-navigation-vector',
		'topo-vector',
		'streets-relief-vector'
	];
</script>

<main>
	<h1>{title}</h1>

  <h2>{subtitle}</h2>

  <p class="project-info">
    Built by <a href="https://twitter.com/JWasilGeo" class="author">Jacob Wasilkowski</a> with
    <a href="https://svelte.dev" target="_blank">Svelte</a> and
    <a href="https://github.com/esri/esri-loader" target="_blank">esri-loader</a>.
  </p>

  <p class="project-info">
    Check out the
    <a href="https://github.com/jwasilgeo/esri-svelte-basemaps-example">source code on GitHub</a>.
  </p>

  <hr>

  <!-- links to different basemap examples below -->
	<nav>
		<a href="#raster-basemaps">Raster Tile Basemaps</a>

		<ul>
			{#each rasterBasemaps as basemap}
				<li><a href="#{basemap}">{basemap}</a></li>
			{/each}
		</ul>

		<a href="#vector-basemaps">Vector Tile Basemaps</a>

		<ul>
			{#each vectorBasemaps as basemap}
				<li><a href="#{basemap}">{basemap}</a></li>
			{/each}
		</ul>
  </nav>

  <hr>

  <label>
    <input type="checkbox" bind:checked={syncExtents}/> {syncExtentsLabel}
  </label>

	<h3 id="raster-basemaps">Raster Tile Basemaps</h3>

  <!-- a list of <Card> components containing one <EsriMapView> component -->
	{#each rasterBasemaps as basemap}
    <Card basemap={basemap} center={demoCenter} scale={demoScale} syncExtents={syncExtents}></Card>
	{/each}

	<h3 id="vector-basemaps">Vector Tile Basemaps</h3>

  <!-- another list of <Card> components containing one <EsriMapView> component -->
	{#each vectorBasemaps as basemap}
    <Card basemap={basemap} center={demoCenter} scale={demoScale} syncExtents={syncExtents}></Card>
  {/each}

  <label>
    <input type="checkbox" bind:checked={syncExtents} /> {syncExtentsLabel}
  </label>
</main>

<style>
	main {
		padding: 1em;
    width: 65%;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
		text-align: center;
	}

	h2 {
    text-align: center;
  }

  .project-info {
    text-align: center;
  }

  .author {
    color: #ff3e00;
    text-decoration: underline;
  }

  hr {
    color: #ff3e00;
    border: 1px solid #ff3e00;
  }

  nav {
    width: 75%;
    margin: 15px auto;
    text-align: center;
  }

  nav > a {
    font-weight: bold;
    margin: 10px 0;
  }

  nav ul {
    padding: 0;
    margin: 10px 0;
  }

  nav li {
		display: inline-block;
	}

	nav li::before {
		content: "•";
		padding: 0 7px;
	}

	nav li:first-child::before {
		content: "";
		padding: 0;
	}

  label {
    text-align: center;
    cursor: pointer;
  }

	@media (max-width: 640px) {
		main, nav {
      width: 85%;
    }
	}
</style>
