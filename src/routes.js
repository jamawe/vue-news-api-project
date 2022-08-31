import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
// import SearchResultsPage from './pages/SearchResultsPage.vue';

export const routes = [

  {
    path: '/',
    component: HomePage 
  },

  {
    path: '/:category(business|entertainment|general|health|science|sports|technology)',
    name: 'CategoryPage',
    component: CategoryPage 
  },

  {
    path: '/:category(business|entertainment|general|health|science|sports|technology)/:slug',
    name: 'ArticlePage',
    component: ArticlePage,
    props: true 
  },

  // { path: '/results',
  //   component: SearchResultsPage 
  // },
  
]

