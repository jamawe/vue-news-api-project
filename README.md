# News API with Vuejs
## Descripton
This project uses Vue.js 2, Vue Router and Vuetify to display requests made to the [News API](https://newsapi.org/).
## Project setup
### Install dependencies
```
npm install
```
### Set own API key in .env
In order to make requests to the News API you need to sign up on their site and request an API key. Once you retrieve a key, you can create a `.env` file in the root of your project and set the environment variable like so:
```
VUE_APP_NEWS_API_KEY=HereGoesTheAPIKey
```

Please note that the queries are specified to request articles in German. Please adjust the queries to your needs using the [News API Documentation](https://newsapi.org/docs).

### Serve the project
```
npm run serve
```

### Compile and minifie the project for production
```
npm run build
```