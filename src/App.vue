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
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
};
</script>

<style>
#app {
  font-family: "Lato", sans-serif;
}
</style>
