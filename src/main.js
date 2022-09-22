require("./bootstrap");
require("./axios");
import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./router/index";
require("./plugins/notify");
// require("./plugins/font-awesome"); // can use if boostrap icons are boring
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import store from "./store";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
