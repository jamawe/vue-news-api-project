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
    path: '/:category(business|education|health|sports|travel|science|sports|world)',
    name: 'CategoryPage',
    component: CategoryPage 
  },

  {
    path: '/:category(business|education|health|sports|travel|science|sports|world)/:slug',
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

