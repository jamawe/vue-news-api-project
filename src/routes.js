import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
import SearchResultsPage from './pages/SearchResultsPage.vue';
import LegalInfoPage from './pages/LegalInfoPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

export const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: 'Home',
    },
  },

  { 
    path: '/search',
    name: 'SearchResultsPage',
    component: SearchResultsPage,
    meta: {
      title: 'Your Search Results',
    },
  },

  { 
    path: '/legal-info',
    name: 'LegalInfoPage',
    component: LegalInfoPage,
    meta: {
      title: 'Impressum',
    },
  },

  {
    path: '/:category',
    name: 'CategoryPage',
    component: CategoryPage,
    props: true,
  },

  {
    path: '/:category/:slug',
    name: 'ArticlePage',
    component: ArticlePage,
    props: true,
  },

  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: NotFoundPage,
    meta: {
      title: '404 Not Found',
    },
  }
  
]

