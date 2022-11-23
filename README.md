# New York Times (NYT) API with Vuejs
## Descripton
This project uses Vue.js 2, Vue Router and Vuetify to display requests made to the [NYT Article Search API](https://developer.nytimes.com/docs/articlesearch-product/1/overview).
## Project setup
### Install dependencies
```
npm install
```
### Set own API key in .env
In order to make requests to the NYT API you need to sign up on their site, register your app and request an API key. Once you retrieve a key, you can create a `.env` file in the root of your project and set the environment variable like so:
```
VUE_APP_NYT_API_KEY=HereGoesTheAPIKey
```
## Retrieve articles
### HomePage view
The articles on the landing page request articles are filtered by the following news desks: Culture, Foreign, Magazine, Politics, Sports.

Furthermore, the articles are sorted with the `newest` sorting keyword and pagination starts at `0` (See `news_desk` and other filters in the [API docs](https://developer.nytimes.com/docs/articlesearch-product/1/overview)):
```
https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Culture" "Foreign" "Magazine" "Politics" "Sports")&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}
```

The [HomePage](https://github.com/jamawe/vue-news-api-project/blob/main/src/pages/HomePage.vue) and the [SearchResultsPage](https://github.com/jamawe/vue-news-api-project/blob/main/src/pages/SearchResultsPage.vue) views both feature a kind of infinite scroll mechanism which also handles a 429 (Too Many Requests) status code by automatically retrying the failed request again.

### CategoryPage view
For now the categories that can be requested from the menu navigation are limited to

- Arts
- Books
- Business
- Culture
- Education
- Express
- Food
- Foreign
- Games
- Health
- Learning
- Magazine
- Movies
- Parenting
- Politics
- Science
- Sports
- Style
- Technology
- Television
- Travel
- U.S.
- Weekend
- World

To change these, add or remove the category to/from the `menu` array in the [menu module](https://github.com/jamawe/vue-news-api-project/blob/main/src/modules/menu.mjs).

But requests to the NYT API are not limited to only this selection. By entering any category slug in the URL it will tried to retrieve articles for that category. Only if the entered slug is not recognized as a news desk or a section, a 'not found' error will be shown to the user (See [CategoryNotFound component](https://github.com/jamawe/vue-news-api-project/blob/main/src/components/CategoryNotFound.vue)).

### ArticlePage view
Until now, displaying a single article only works by navigating to it from the the slider on the`CategoryPage` view or choosing an article from the `ArticleHeadlinePreview` component on the `ArticlePage` view itself.

This is a detour because no article data is stored centrally. Instead the data is passed via route props for now.

### SearchResultsPage view

Via the search dialog accessible through the`AppNavbar`component or the panel to modify a previously executed search on the `SearchResultsPage` itself, API request with keywords can be made.

Furthermore, the request can be refined by selecting news desks that will act as filters for the request. Those news desks are the same pre-selected one that can be found in the menu.

```
https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryString}&fq=news_desk:(${newsDesk})&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}
```

If no news desks were selected to filter the results, `&fq=news_desk:(${newsDesk})` can be omitted.

## Ideas on expanding this project

The current request limit from the NYT API is either 10 requests per minute or 4000 requests per day. The project handles this circumstance by catching requests that fail with a status code of 429 (Too Many Requests) and [retrying the same request again after a short period of time](https://github.com/jamawe/vue-news-api-project/blob/main/src/pages/HomePage.vue).

To make fewer requests a better solution could be to use a state management tool. Until now, no Vuex or other state management tools are used. To maintain state (in this case the news articles) and at least not to make an API request on every page load, the `/modules/articles.mjs` module could be transferred into a state management system.

A longer-term solution even could be to develop a caching stategy and store articles client-side, e.g. to turn the project into an Progressive Web App using the Cache and IndexedDB APIs.

## Serve the project
```
npm run serve
```
Note: You can visit the served project on a mobile device by entering the Network address (`http://192.XXX.X.XXX:8080/`) in your mobile browser.

## Compile and minifie the project for production
```
npm run build
```