<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mx-auto">

        <div class="d-flex justify-center article-category">
          <span class="line-behind">{{ category }}</span>
        </div>

        <article-slider
          :articlesForSlider="this.articles"
          v-if="loaded"
        ></article-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleSlider from '../components/ArticleSlider.vue';
import axios from 'axios';
import articleMixin from '../mixins/articleMixin';

export default {

  name: 'CategoryPage',

  components: {
    'article-slider': ArticleSlider,
  },

  mixins: [ articleMixin ],

  data() {
    return {
      loaded: false,
      articles: [],
      category: this.$route.params.category,
    }
  },

  created() {
    this.getArticles();
  },

  methods: {
    getArticles() {

      axios.get(`https://newsapi.org/v2/top-headlines?country=de&category=${this.category}&from=${this.todayToAPIString}&to=${this.todayToAPIString}&pageSize=50&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
      .then(res => {

        const data = res.data.articles;

        for (let key in data) {
          const article = data[key];
            
          // Filtern nach Source names und check, dass keiner der values von content, description, title, url und urlToImage leer sind
          if (this.sources.includes(article['source']['name']) && (article['content']&&article['description']&&article['title']&&article['url']&&article['urlToImage'] != null)) {

            article['prettyTitle'] = this.makePrettyTitle(article['title']);

            article['slug'] = this.makeSlug(article['prettyTitle'][1]);
            
            article['publishedAt'] = this.makePrettyDate(article['publishedAt']);

            article['content'] = this.makePrettyContent(article['content']);

            article['category'] = this.category;

            if (this.articles.length < 10) {
              this.articles.push(article);
            } else {
              break;
            }
            
          }
            
        }

        // eslint-disable-next-line
        console.log(this.articles);

        this.loaded = true;

      })
      // eslint-disable-next-line
      .catch(error => console.log(error));
    },
  },

  computed: {
    todayToAPIString() {
      // Get today's date and format it toNewsAPIs convention (yyyy-mm-dd)
        const today = new Date();

        let year = '' + today.getFullYear();
        let month = '' + (today.getMonth() + 1);
        let day = '' + today.getDate();

        if (month.length < 2) {
          month = '0' + month;
        }

        if (day.length < 2) {
          day = '0' + day;
        }

        return [year, month, day].join('-');
    },

  },

}
</script>

<style scoped>

 .article-category {
    font-family: 'Courier New', Courier, monospace;
  }
  
</style>