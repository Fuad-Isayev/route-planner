<template>
  <div v-if="(duration || noRoute) && !isLoading">
    <hr class="my-16" />
    <h2 class="mb-8">Route details</h2>
    <div v-if="noRoute" class="alert">
      <v-icon color="#FF5252" class="mx-4">mdi-alert</v-icon>No route was found
      for the given locations.
    </div>
    <div class="route-details" v-else>
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-2">mdi-map-marker-distance</v-icon>
          Distance
        </v-card-title>
        <v-card-text class="card-text">{{ distance }} km</v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-2">mdi-timer-outline</v-icon>
          Driving time
        </v-card-title>
        <v-card-text class="card-text">{{ duration }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouteDetails",
  props: {
    isLoading: Boolean,
    noRoute: Boolean,
  },
  computed: {
    distance() {
      return this.$store.state.distance;
    },
    duration() {
      return this.$store.state.duration;
    },
  },
};
</script>

<style lang="scss" scoped>
.route-details {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  .v-card {
    border: 1px solid #9e9e9e;
    border-radius: 8px;
    font-weight: 400;
    flex: 1;
    min-width: 0;
    height: 97px;
    i {
      color: #121231;
      font-size: 16px;
      font-weight: 700;
    }
    .v-card__title {
      color: #121231;
      font-size: 16px;
      line-height: 19.2px;
      padding-bottom: 10px;
    }
    .card-text {
      font-size: 32px;
      line-height: 38.4px;
      color: #121231;
    }
  }
}
.alert {
  width: 100%;
  height: 56px;
  border: 1px solid #ff5252;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: start;
}
</style>
