import Vue from "vue";
import Vuex from "vuex";
import polyline from "@mapbox/polyline";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [
      { code: "AT", id: 11 },
      { code: "BE", id: 17 },
      { code: "FR", id: 70 },
      { code: "DE", id: 74 },
      { code: "CH", id: 193 },
      { code: "ES", id: 187 },
      { code: "PL", id: 159 },
      { code: "NL", id: 200 },
    ],
    loadings: [[]],
    unloadings: [[]],
    distance: 0,
    duration: 0,
    steps: [],
    borders: [],
    countriesToAvoid: [],
  },
  mutations: {
    setLoadings(state, payload) {
      const newLoadings = [...state.loadings];
      newLoadings[payload.index] = payload.place;
      state.loadings = newLoadings;
    },
    addLoading(state) {
      state.loadings.push([]);
    },
    removeLoading(state, payload) {
      state.loadings = state.loadings.filter((_, index) => index !== payload);
    },
    setUnloadings(state, payload) {
      const newUnloadings = [...state.unloadings];
      newUnloadings[payload.index] = payload.place;
      state.unloadings = newUnloadings;
    },
    addUnloading(state) {
      state.unloadings.push([]);
    },
    removeUnloading(state, payload) {
      state.unloadings = state.unloadings.filter(
        (_, index) => index !== payload
      );
    },
    setDistance(state, payload) {
      const distance = Math.round(payload / 1000);
      state.distance = distance;
    },
    setDuration(state, payload) {
      const hours = Math.floor(payload / 3600);
      const minutes = Math.floor((payload % 3600) / 60);
      const duration = `${hours ? hours + " h" : ""} ${minutes} min`;
      state.duration = duration;
    },
    setSteps(state, payload) {
      const coordinates = polyline.decode(payload);
      state.steps = coordinates;
    },
    setBorders(state, payload) {
      const borders = [
        [payload[1], payload[0]],
        [payload[3], payload[2]],
      ];
      state.borders = borders;
    },
    setCountriesToAvoid(state, payload) {
      state.countriesToAvoid = payload;
    },
  },
});
