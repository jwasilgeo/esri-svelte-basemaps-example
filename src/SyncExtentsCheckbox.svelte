<script>
  // the <SyncExtentsCheckbox> component optionally syncs MapView extents and rotations
  // by binding a Boolean value from a store to a checkbox's "checked" attribute

  // the same store is then used by <EsriMapView> children components
  // to know if they should sync their extents and rotations

  import { storeSyncExtentsEnabled } from './stores.js';
</script>

<label>
  <input type="checkbox" bind:checked={$storeSyncExtentsEnabled} />
  Sync Extent and Rotation?
</label>

<style>
  label {
    text-align: center;
    cursor: pointer;
    background-color: #f4f4f4;
  }
</style>
