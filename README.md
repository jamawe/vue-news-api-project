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
### Landing Page
The articles on the landing page request articles *not* filtered by any query or news_desk (See [docs](https://developer.nytimes.com/docs/articlesearch-product/1/overview)), solely sorted with the `newest` sorting keyword and pagination which is set to the first page `0`:

```
https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}
```

### Categories (News Desks)
For now the categories that can be requested are limited to

- Arts
- Business
- Foreign
- Learning
- Science
- Sports
- Technology
- World

To change these, add or remove the category to/from the regEx pattern that limits the `CategoryPage` and `ArticlePage` in `routes.js` as well as the `categories` array in the `/modules/articles.mjs` module.

## Ideas on expanding this project

Currently no Vuex or other state management tools are used. To maintain state (in this case the news articles) and don't make an API request on every page load, the `/modules/articles.mjs` module could be transferred into a state management system.

## Serve the project
```
npm run serve
```

## Compile and minifie the project for production
```
npm run build
```