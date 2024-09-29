<template>
  <div>
    <h3 class="mb-4">More features</h3>
    <v-select
      dense
      outlined
      label="Avoid countries"
      placeholder="Avoid countries"
      :items="countries"
      item-text="code"
      item-value="id"
      multiple
      clearable
      @change="handleValueChange"
      :menu-props="{ offsetY: true, maxHeight: '200px' }"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "MoreFeatures",
  computed: {
    countries() {
      return this.$store.state.countries;
    },
  },
  methods: {
    handleValueChange(val) {
      this.$store.commit("setCountriesToAvoid", val);
    },
  },
};
</script>

<style scoped></style>
