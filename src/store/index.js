import Vue from "vue";
import Vuex from "vuex";
import {
  ALL_ROUTES
} from "./types";
import {
  filterRoutes
} from '@/utils/base';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routes: []
  },
  mutations: {
    [ALL_ROUTES](state, data) {
      state.routes = data;
    }
  },
  getters: {
    routes(state) {
      return state.routes;
    }
  },
  actions: {
    generateRoutes({
      commit
    }, data) {
      let routes = filterRoutes(data);
      commit(ALL_ROUTES, routes);
    }
  },
  modules: {}
});