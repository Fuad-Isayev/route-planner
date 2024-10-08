<template>
  <div class="map">
    <l-map :zoom="zoom" :center="center" ref="map" style="width: 100%">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <l-polyline
        :lat-lngs="routeCoordinates"
        :options="{ color: '#7087FF', weight: 4 }"
      />
      <div v-if="routeCoordinates.length">
        <l-marker
          v-for="(marker, index) in loadingMarkers"
          :key="`loading-marker-${index}`"
          :lat-lng="marker"
        >
          <l-icon
            ><div class="customMarker">
              <span>{{ index + 1 }}</span>
            </div>
          </l-icon>
        </l-marker>
        <l-marker
          v-for="(marker, index) in unloadingMarkers"
          :key="`unloading-marker-${index}`"
          :lat-lng="marker"
        >
          <l-icon
            ><div class="customMarker">
              <span>{{ loadings.length + index + 1 }}</span>
            </div>
          </l-icon>
        </l-marker>
      </div>
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds } from "leaflet";
import { LMap, LTileLayer, LPolyline, LMarker, LIcon } from "vue2-leaflet";

export default {
  name: "MapView",
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LMarker,
    LIcon,
  },
  data() {
    return {
      zoom: 12,
      center: [52.3459, 9.762],
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
        if (!unloading.length) return undefined;
        return latLng(unloading[1], unloading[0]);
      });
      return markers.filter((m) => m);
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

<style lang="scss" scoped>
.map {
  height: calc(100vh - 77px);
  width: calc(100vw - 600px);
}
.customMarker {
  height: 30px;
  width: 22px;
  margin-top: -25px;
  margin-left: -4px;
  background-image: url("/public/ellipse.svg");
  text-align: center;
  span {
    font-family: "Lato", sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
