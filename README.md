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

To change these, add or remove the category to/from the `menu` array in the [menu module](/jamawe/vue-news-api-project/blob/main/src/modules/menu.mjs).
But requests to the NYT API are not limited to this selection. By entering any category slug in the URL it is tried to retrieve articles for that category. Only if the entered slug is not recognized as a news desk or a section, a 'not found' error will be shown to the user.

## Ideas on expanding this project

The current request limit from the NYT API is either 10 requests per minute or 4000 requests per day. The project handles this circumstance by catching requests that fail with a status code of 429 (Too Many Requests) and [retrying the same request again after a short period of time](/jamawe/vue-news-api-project/blob/main/src/pages/HomePage.vue).
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