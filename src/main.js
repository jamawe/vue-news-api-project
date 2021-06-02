import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import vuetify from './plugins/vuetify';
// import categoryMixin from './mixins/categoryMixin';
// import VueSplide from '@splidejs/vue-splide';
// import VueTinySlider from 'vue-tiny-slider';

// export const bus= new Vue();

Vue.use( VueRouter );
// Vue.use( VueTinySlider );
// Vue.mixin( categoryMixin );

// Vue.component("tiny-slider", VueTinySlider);

const router = new VueRouter({
  routes,
  mode: 'history',
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
