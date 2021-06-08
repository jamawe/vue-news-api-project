import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
import SearchResultsPage from './pages/SearchResultsPage.vue';

export const routes = [
  { path: '/',
    component: HomePage 
  },
  { path: '/:category(business|entertainment|general|health|science|sports|technology)',
    name: 'CategoryPage',
    component: CategoryPage },
  // { path: '/:category(business|unterhaltung|allgemein|gesundheit|wissenschaft|sport|technologie)',
  //   name: 'CategoryPage',
  //   component: CategoryPage,
  //   props: true 
  // },
  { path: '/:category(business|entertainment|general|health|science|sports|technology)/:slug',
    name: 'ArticlePage',
    component: ArticlePage,
    props: true 
  },
  // { path: '/:category(business|unterhaltung|allgemein|gesundheit|wissenschaft|sport|technologie)/:slug',
  //   name: 'ArticlePage',
  //   component: ArticlePage,
  //   props: true 
  // },
  { path: '/results',
    component: SearchResultsPage 
  }, // Todo: Wie sieht Route von Suchergebnissen bei anderen Seiten aus?
]

