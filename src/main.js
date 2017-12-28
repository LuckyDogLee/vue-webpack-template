import 'normalize.css';
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// fetch relies on Promise, so we need a Promise polyfill for older browsers
if (!window.Promise) {
  window.Promise = Promise;
}

const app = new Vue({
  router,
  render: h => h(App),
});

// actually mount to DOM
app.$mount('#app');
