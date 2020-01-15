import App from './App.svelte';

const app = new App({
	target: document.body,
  props: {
    // configurable title and subtitle for HTML display
    title: 'Esri Svelte Example',
    subtitle: 'Explore Esri\'s Basemaps',

    // configurable Esri MapView initial center and scale values
    demoCenter: [-59.5, -51.85], // Islas Malvinas / Falkland Islands
    demoScale: 4622324
	}
});

export default app;
