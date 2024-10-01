<template>
  <div class="loadings">
    <div class="header mb-4">
      <h3>Loading</h3>
      <button @click="handleAddLoading">Add loading spot</button>
    </div>
    <AddressInput
      v-for="(_, index) in loadings"
      :key="`loading-${index}`"
      :index="index"
      @placeSelected="handlePlaceSelect"
      @addressRemoved="handleRemoveLoading"
    />
  </div>
</template>

<script>
import AddressInput from "./AddressInput.vue";

export default {
  name: "Loadings",
  components: {
    AddressInput,
  },
  computed: {
    loadings() {
      return this.$store.state.loadings;
    },
  },
  methods: {
    handlePlaceSelect(payload) {
      this.$store.commit("setLoadings", payload);
    },
    handleAddLoading() {
      this.$store.commit("addLoading");
    },
    handleRemoveLoading(index) {
      this.$store.commit("removeLoading", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  button {
    font-weight: 700;
    color: #121231;
    font-size: 16px;
    border-bottom: 1px solid;
    line-height: 19.2px;
  }
}
.loadings {
  margin-bottom: 14px;
}
</style>
