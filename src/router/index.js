import Vue from "vue";
import VueRouter from "vue-router";
import Portal from "@/views/Portal";

Vue.use(VueRouter);

// import {
//   ALL_ROUTES
// } from "@/store/types";
import store from "@/store";

const routes = [{
    path: "/",
    name: "Portal",
    component: Portal
  },
  {
    path: "/ballcrash",
    name: "BallCrash",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/BoundCrash")
  }
];
store.dispatch("generateRoutes", routes);
// store.commit(ALL_ROUTES, routes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;