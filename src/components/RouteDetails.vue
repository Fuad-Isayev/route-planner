<template>
  <div v-if="duration && !isLoading">
    <h3 class="mb-8">Route details</h3>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
            <v-icon class="mr-2">mdi-map-marker-distance</v-icon>
            Distance
          </v-card-title>
          <v-card-text class="card-text">{{ distance }} km</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat>
          <v-card-title>
            <v-icon class="mr-2">mdi-timer-outline</v-icon>
            Driving time
          </v-card-title>
          <v-card-text class="card-text">{{ duration }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "RouteDetails",
  props: {
    isLoading: Boolean,
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
.v-card {
  border: 1px solid #9e9e9e;
  border-radius: 8px;
  font-weight: 400;
  i {
    color: #000;
  }
  .v-card__title {
    color: #000;
    font-size: 16px;
  }
  .card-text {
    font-size: 32px;
    color: #000;
  }
}
</style>
