import Vue from "vue";
const req = require.context(".", true, /\.vue$/);


req.keys().forEach(filename => {
  if (filename) {
    let componentConfig = req(filename);
    let name = filename.name || filename.replace(/^\.\/(.*\/)?/, "").replace(/\.vue$/, "");
    Vue.component(name, componentConfig || componentConfig.default);
  }
})