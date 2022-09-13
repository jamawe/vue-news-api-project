import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
// import SearchResultsPage from './pages/SearchResultsPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

export const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage 
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

  // { path: '/results',
  //   component: SearchResultsPage 
  // },

  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: NotFoundPage,
  }
  
]

