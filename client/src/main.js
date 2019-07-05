import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueScrollReveal from 'vue-scroll-reveal'
import numFormat from 'vue-filter-number-format';
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader)
Vue.use(require('vue-moment'));
Vue.filter('numFormat', numFormat)
Vue.use(VueScrollReveal)
Vue.use(Buefy)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");