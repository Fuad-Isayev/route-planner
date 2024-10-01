<template>
  <div id="app">
    <v-app>
      <v-main>
        <Header />
        <div class="d-flex">
          <SideBar />
          <MapView />
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import MapView from "./components/MapView.vue";
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    Header,
    SideBar,
    MapView,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Lato", sans-serif;
  font-weight: 500;
  h2 {
    line-height: 28.8px;
  }
  h3 {
    font-size: 20px;
    line-height: 24px;
  }
  input {
    font-size: 16px;
    line-height: 19.2px;
    color: #121231;
    font-weight: 500;
  }
  .v-list-item {
    color: #121231 !important;
    font-weight: 500;
    font-size: 14px;
    line-height: 16.8px;
  }
  .leaflet-control-zoom {
    margin-top: 22px;
    margin-left: 22px;
    .leaflet-control-zoom-in,
    .leaflet-control-zoom-out {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #121231;
      height: 48px;
      width: 48px;
    }
  }
}
html {
  overflow-y: auto;
}
</style>
