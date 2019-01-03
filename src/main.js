import Vue from 'vue';
import App from './App.vue';
import VTooltip from 'v-tooltip';
import MonacoEditor from 'vue-monaco';
import Notifications from 'vue-notification';
import './../node_modules/bulma/css/bulma.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
 
Vue.use(VTooltip)
Vue.use(Notifications)
Vue.component('monaco-editor',MonacoEditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

