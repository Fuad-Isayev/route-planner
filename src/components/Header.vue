<template>
  <v-app-bar height="77px" class="app-bar">
    <div class="my-header px-6">
      <img src="logo.svg" alt="logo" />
      <div>
        <span>
          <v-icon color="green" class="mr-4">mdi-check</v-icon> 100% Free
        </span>
        <span class="ml-12">
          <v-icon color="green" class="mr-4">mdi-check</v-icon> Detailed route
          information
        </span>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.app-bar {
  background: #fff !important;
}
.my-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
