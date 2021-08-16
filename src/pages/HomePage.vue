<template>

  <v-container>
    <v-row>
      <v-col cols="10" class="mx-auto">
        <div><router-link class="text-decoration-none line-behind black--text home-page-title" :to="`/${this.category}`">
          latest news
        </router-link></div>
      </v-col>
    </v-row>

    <v-row v-if="articlesFrontPage.length">
      <v-spacer></v-spacer>
      <ArticleSingle
        v-for="(article, i) in articlesFrontPage"
        :key="i"
        :articleSingle="article"
      />
      <v-spacer></v-spacer>
    </v-row>

    <!-- <v-row>
      <ArticleSearch />
    </v-row> -->
  </v-container>

</template>

<script>
import ArticleSingle from '../components/ArticleSingle.vue';
// import ArticleSearch from '../components/ArticleSearch.vue';
import axios from 'axios';
import articleMixin from '../mixins/articleMixin';

export default {

  name: 'HomePage',

  components: {
    ArticleSingle,
    // ArticleSearch,
  },

  mixins: [ articleMixin ],

  data() {
    return {
      loaded: false,
      articlesFrontPage: [],
      category: 'general',
    }
  },

  created() {
    this.getArticleFrontPage();
  },

  methods: {
    getArticleFrontPage() {

      axios.get(`https://newsapi.org/v2/top-headlines?country=de&category=${this.category}&from=${this.todayToAPIString}&to=${this.todayToAPIString}&pageSize=5&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
      .then(res => {

        const data = res.data.articles;

        // eslint-disable-next-line
        // console.log("data:", data, data[0].urlToImage);

        // only for ArticleBox component
        // let count = 0;

        for (let key in data) {
          const article = data[key];
            
          // Filtern nach Source names und check, dass keiner der values von content, 
          // description, title, url und urlToImage leer sind
          if (this.sources.includes(article['source']['name'])&& 
          (article['content']&&article['description']&&article['title']&&
          article['url']&&article['urlToImage'] != null)) {

            article['prettyTitle'] = this.makePrettyTitle(article['title']);

            article['slug'] = this.makeSlug(article['prettyTitle'][1]);

            article['publishedAt'] = this.makePrettyDate(article['publishedAt']);

            article['content'] = this.makePrettyContent(article['content']);

            article['category'] = this.category;

            // only for ArticleBox component
            // if (count < 1) {
            //   article['flex'] = 10;
            //   article['imgWidth'] = 'auto';
            //   article['imgHeight'] = 'auto';
            //   article['cardWidth'] = 'auto';
            //   count++;
            // } else {
            //   article['flex'] = 6;
            //     article['imgWidth'] = 250;
            //     article['imgHeight'] = 250;
            //     article['cardWidth'] = 250;
            //   count++;
            // }

            if (this.articlesFrontPage.length < 1) {
              this.articlesFrontPage.push(article);
            } else {
              break;
            }
            
          }
            
        }

        // eslint-disable-next-line
        console.log(this.articleFrontPage);

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

  .home-page-title {
    font-family: 'Courier New', Courier, monospace;
  }
  
</style>