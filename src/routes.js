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
    path: '/:category(arts|business|foreign|learning|science|sports|technology|world)',
    name: 'CategoryPage',
    component: CategoryPage 
  },

  {
    path: '/:category(arts|business|foreign|learning|science|sports|technology|world)/:slug',
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

