<template>
  <div class="mb-4">
    <div class="header mb-4">
      <h3>Unloading</h3>
      <button @click="handleAddUnloading">Add unloading spot</button>
    </div>
    <AddressInput
      v-for="(_, index) in unloadings"
      :key="`unloading-${index}`"
      :index="index"
      @placeSelected="handlePlaceSelect"
      @addressRemoved="handleRemoveUnloading"
    />
  </div>
</template>

<script>
import AddressInput from "./AddressInput.vue";

export default {
  name: "Unloadings",
  components: {
    AddressInput,
  },
  computed: {
    unloadings() {
      return this.$store.state.unloadings;
    },
  },
  methods: {
    handlePlaceSelect(payload) {
      this.$store.commit("setUnloadings", payload);
    },
    handleAddUnloading() {
      this.$store.commit("addUnloading");
    },
    handleRemoveUnloading(index) {
      this.$store.commit("removeUnloading", index);
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
    border-bottom: 1px solid;
    line-height: 19.2px;
  }
}
</style>
