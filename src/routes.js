import HomePage from './pages/HomePage.vue';
import CategoryPage from './pages/CategoryPage.vue';
import ArticlePage from './pages/ArticlePage.vue';
import SearchResultsPage from './pages/SearchResultsPage.vue';

export const routes = [
  { path: '/',
    component: HomePage },
  { path: '/:category(business|entertainment|general|health|science|sports|technology)',
    name: 'Category',
    component: CategoryPage }, // Todo: '/category' dynamisch!
  { path: '/:category(business|entertainment|general|health|science|sports|technology)/:slug',
    name: 'ArticlePage',
    component: ArticlePage,
    props: true }, // Todo: '/category/article' dynamisch, entweder mit article als slug oder id!
  { path: '/results',
    component: SearchResultsPage }, // Todo: Wie sieht Route von Suchergebnissen bei anderen Seiten aus?
]