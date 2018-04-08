import Vue from 'vue';

import App from './App';
import Header from './components/Header';
import Banner from './components/Banner';
import Schedule from './components/Schedule';
import Spinner from './components/Spinner';

Vue.component('tt-header', Header);
Vue.component('tt-banner', Banner);
Vue.component('tt-schedule', Schedule);
Vue.component('tt-spinner', Spinner);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
