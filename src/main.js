import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import vuetify from './plugins/vuetify';

Vue.use( VueRouter );

const router = new VueRouter({

  routes,
  mode: 'history',
  // eslint-disable-next-line
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) window.document.title = `${to.meta.title} — Vuews`;

  return next();
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
