import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import Posts from './pages/Posts.vue';
import Show from './pages/Show.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/home', component: Home },
    { path: '/posts', component: Posts },
    { path: '/show', component: Show },
  ],
});
