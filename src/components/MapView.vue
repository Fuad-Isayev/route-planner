<template>
  <div class="map">
    <l-map :zoom="zoom" :center="center" ref="map" style="width: 100%">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      />
      <l-polyline :lat-lngs="routeCoordinates" />
      <div v-if="routeCoordinates.length">
        <l-marker
          v-for="(marker, index) in loadingMarkers"
          :key="`loading-marker-${index}`"
          color="red"
          v-html="1"
          :lat-lng="marker"
        />
        <l-marker
          v-for="(marker, index) in unloadingMarkers"
          :key="`unloading-marker-${index}`"
          color="red"
          v-html="2"
          :lat-lng="marker"
        />
      </div>
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds } from "leaflet";
import { LMap, LTileLayer, LPolyline, LMarker } from "vue2-leaflet";

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
  },
  data() {
    return {
      zoom: 12,
      // center: [52.3459, 9.762],
      center: [52.5309, 13.3847],
      attribution: "© OpenStreetMap contributors",
    };
  },
  computed: {
    loadings() {
      return this.$store.state.loadings;
    },
    unloadings() {
      return this.$store.state.unloadings;
    },
    loadingMarkers() {
      const markers = this.loadings.map((loading) => {
        if (!loading.length) return undefined;
        return latLng(loading[1], loading[0]);
      });
      return markers.filter((m) => m);
    },
    unloadingMarkers() {
      const markers = this.unloadings.map((unloading) => {
        if (!unloading.length) return { lat: "", lng: "" };
        return latLng(unloading[1], unloading[0]);
      });
      return markers;
    },
    routeCoordinates() {
      return this.$store.state.steps;
    },
    borders() {
      return this.$store.state.borders;
    },
  },
  watch: {
    borders(val) {
      if (val) {
        const bounds = new latLngBounds(val);

        this.$refs.map.fitBounds(bounds);
      }
    },
  },
};
</script>

<style scoped>
.map {
  background: #faf0f0;
  height: calc(100vh - 64px);
  width: calc(100vw - 621px);
}
</style>
