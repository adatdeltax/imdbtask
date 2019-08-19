import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import router from './router';
import VeeValidate from 'vee-validate';
import Multiselect from 'vue-multiselect'

// multiselect
Vue.component('multiselect', Multiselect)

//For desgin
Vue.use(BootstrapVue)

//For validation
Vue.use(VeeValidate)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
