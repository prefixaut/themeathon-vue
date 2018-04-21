import Vue from 'vue';

import App from './App';
import Banner from './components/Banner';
import Card from './components/Card';
import Header from './components/Header';
import Schedule from './components/Schedule';
import Spinner from './components/Spinner';
import Team from './components/Team';

Vue.component('tt-banner', Banner);
Vue.component('tt-card', Card);
Vue.component('tt-header', Header);
Vue.component('tt-schedule', Schedule);
Vue.component('tt-spinner', Spinner);
Vue.component('tt-team', Team);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
