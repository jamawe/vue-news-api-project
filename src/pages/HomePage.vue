<template>

  <v-container>
    <v-row>
      <v-col cols="10" class="mx-auto">
        <div class="monospace">
          <span class="line-behind">aktuell</span>
        </div>
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
    // this.getArticleFrontPage();
  },

  methods: {
    getArticleFrontPage() {

      // axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Sports") AND pub_date:(2022-09-03)&page=1&api-key=${process.env.VUE_APP_NYT_API_KEY}`)
      //   .then(res => {
      //     // console.log('%cres', 'color: darkseagreen; font-weight: bold;', res);
      //   })
      //   .catch(err => {
      //     console.log('%cerr', 'color: red; font-weight: bold;', err);
      //   });
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