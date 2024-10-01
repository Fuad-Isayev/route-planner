<template>
  <div class="sidebar px-10">
    <h2 class="mb-8">Route configuration</h2>
    <Loadings />
    <Unloadings />
    <MoreFeatures />
    <v-btn
      @click="calculateRoute"
      large
      :disabled="submitButtonDisabled"
      block
      class="submitButton"
    >
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="white"
        size="24"
        width="2"
      />
      <span v-else>Calculate Route</span>
    </v-btn>
    <RouteDetails :isLoading="isLoading" :noRoute="noRoute" />
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
      isLoading: false,
      noRoute: false,
    };
  },
  computed: {
    loadings() {
      return this.$store.state.loadings;
    },
    unloadings() {
      return this.$store.state.unloadings;
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
        this.noRoute = false;
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
        this.noRoute = true;
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
  padding-bottom: 16px;
  height: calc(100vh - 77px);
  overflow: auto;
  .submitButton {
    margin-top: 14px;
    background: #e50043;
    text-transform: none;
    font-family: "Lato";
    letter-spacing: 0;
    font-size: 16px;
    line-height: 19.2px;
    font-weight: 700;
    color: #fff;
    &.v-btn--disabled {
      color: #fff !important;
      background: #9e9e9e !important;
    }
  }
}
</style>
