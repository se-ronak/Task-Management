import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  timeout: 1500,
};

Vue.config.productionTip = false;

Vue.use(Toast, toastOptions);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
