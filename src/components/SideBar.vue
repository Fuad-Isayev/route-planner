<template>
  <div class="sidebar px-10">
    <h2 class="mb-8">Route configuration</h2>
    <Loadings />
    <Unloadings />
    <MoreFeatures />
    <v-btn
      @click="calculateRoute"
      :disabled="submitButtonDisabled"
      block
      class="submitButton mt-3"
      ><v-progress-circular
        v-if="isLoading"
        indeterminate
        color="white"
        size="24"
        width="2"
      ></v-progress-circular
      ><span v-else>Calculate Route</span></v-btn
    >
    <hr class="my-10" />
    <RouteDetails :isLoading="isLoading" />
  </div>
</template>

<script>
import { routesAPI } from "@/API/endpoints/routes";
import Loadings from "./Loadings.vue";
import MoreFeatures from "./MoreFeatures.vue";
import RouteDetails from "./RouteDetails.vue";
import Unloadings from "./Unloadings.vue";

export default {
  name: "SideBar",
  components: {
    Loadings,
    Unloadings,
    MoreFeatures,
    RouteDetails,
  },
  data() {
    return {
      isScriptLoaded: false,
      isLoading: false,
    };
  },
  computed: {
    loadings() {
      return this.$store.state.loadings;
    },
    unloadings() {
      return this.$store.state.unloadings;
    },
    opp() {
      return this.loadings.every((l) => l.length > 0);
    },
    submitButtonDisabled() {
      const loadingsAreFilled = this.loadings.every((l) => l.length > 0);
      const unloadingsAreFilled = this.unloadings.every((u) => u.length > 0);

      return !loadingsAreFilled || !unloadingsAreFilled;
    },
    countriesToAvoid() {
      return this.$store.state.countriesToAvoid;
    },
  },
  methods: {
    async calculateRoute() {
      if (this.isLoading) return;
      const coordinates = [...this.loadings, ...this.unloadings];
      try {
        this.isLoading = true;
        const options = { avoid_countries: this.countriesToAvoid };

        const response = await routesAPI.calculate({ coordinates, options });
        const { summary, geometry, bbox } = response.data.routes[0];
        const { distance, duration } = summary;

        this.$store.commit("setDistance", distance);
        this.$store.commit("setDuration", duration);
        this.$store.commit("setSteps", geometry);
        this.$store.commit("setBorders", bbox);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 600px;
  padding-top: 64px;
  height: calc(100vh - 64px);
  .submitButton {
    text-transform: none;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background: #e50043;
  }
}
</style>
