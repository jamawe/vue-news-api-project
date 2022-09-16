import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
import SearchPage from './pages/SearchPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

export const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage 
  },

  { path: '/search',
    name: 'SearchPage',
    component: SearchPage,
  },

  {
    path: '/:category',
    name: 'CategoryPage',
    component: CategoryPage,
    props: true 
  },

  {
    path: '/:category/:slug',
    name: 'ArticlePage',
    component: ArticlePage,
    props: true 
  },

  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: NotFoundPage,
  }
  
]

