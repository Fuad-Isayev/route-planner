<template>
  <v-row class="address-input">
    <v-col lg="3">
      <v-select
        dense
        outlined
        label="Country"
        :items="countries"
        item-text="code"
        item-value="code"
        v-model="selectedCountry"
        :menu-props="{ offsetY: true, maxHeight: '200px' }"
      ></v-select>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="selectedAddress"
        :search-input.sync="query"
        :items="predictions"
        :label="isGoogleAPILoading ? 'Loading...' : 'Address'"
        ref="autocompleteInput"
        item-text="description"
        item-value="place_id"
        placeholder="Address"
        outlined
        dense
        :disabled="isGoogleAPILoading"
        :append-icon="null"
        hide-no-data
      />
    </v-col>
    <v-icon v-if="index !== 0" @click="removeAddress">mdi-close</v-icon>
  </v-row>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { debounce } from "lodash";

export default {
  name: "AddressInput",
  props: {
    index: Number,
  },
  data() {
    return {
      selectedCountry: "DE",
      query: "",
      predictions: [],
      selectedAddress: "",
      isGoogleAPILoading: false,
    };
  },
  async mounted() {
    this.loadAutocompleteService();
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
  },
  watch: {
    query: debounce(function (val) {
      this.fetchSuggestions(val);
    }, 200),
    selectedCountry() {
      this.selectedAddress = "";
      this.$emit("placeSelected", { place: [], index: this.index });
    },
    selectedAddress(val) {
      if (val && val.length > 0) {
        this.placesService.getDetails({ placeId: val }, (place) => {
          const selectedPlace = [
            place.geometry.location.lng(),
            place.geometry.location.lat(),
          ];
          this.$emit("placeSelected", {
            place: selectedPlace,
            index: this.index,
          });
        });
        this.$refs.autocompleteInput.blur();
      }
    },
  },
  methods: {
    async loadAutocompleteService() {
      try {
        this.isGoogleAPILoading = true;
        const loader = new Loader({
          apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        });

        const Places = await loader.importLibrary("places");

        this.autocompleteService = new Places.AutocompleteService();
        this.placesService = new Places.PlacesService(
          document.createElement("div")
        );

        this.isGoogleAPILoading = false;
      } catch (error) {
        console.error("Error loading AutocompleteService:", error);
      }
    },
    updateSuggestions(predictions) {
      this.predictions = predictions;
    },
    removeAddress() {
      this.$emit("addressRemoved", this.index);
    },
    fetchSuggestions(val) {
      if (val && val.length > 0) {
        this.autocompleteService.getPlacePredictions(
          {
            input: val,
            componentRestrictions: { country: this.selectedCountry },
          },
          this.updateSuggestions
        );
      } else {
        this.predictions = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.address-input {
  position: relative;
  button {
    position: absolute;
    right: -24px;
    top: 16px;
    font-size: 32px;
  }
}
</style>
