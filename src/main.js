import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import vueSmoothScroll from 'vue2-smooth-scroll'
import AOS from "aos";
import "aos/dist/aos.css";
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueNativeSock from 'vue-native-websocket'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

Vue.use(VueNativeSock, 'ws://localhost:8083', {
  connectManually: true,
})
library.add(faCoffee, faPlay)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(vueSmoothScroll)
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init()
  },
  router,
  data: {
    title: 'Quizy'
  },
  render: h => h(App)
}).$mount('#app')
