import Vue from 'vue'
import App from './App'
import Header from './components/Header'
import Banner from './components/Banner'

Vue.component('tt-header', Header)
Vue.component('tt-banner', Banner)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
