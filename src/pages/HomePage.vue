<template>

  <v-container>
    <v-row>
      <v-col cols="10" class="mx-auto">
        <div class="monospace">
          <span class="line-behind">aktuell</span>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <ArticleSingle
          v-for="(article, i) in articles"
          :key="i"
          :articleSingle="article"
        />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>

</template>

<script>
import ArticleSingle from '../components/ArticleSingle.vue';
// import ArticleSearch from '../components/ArticleSearch.vue';
import articleMixin from '../mixins/articleMixin';
import { createApiRequest, getArticles, modifyArticlesForDisplay } from '../modules/articles.mjs';

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
      articles: [],
      date: '',
      url: '',
      newsDesk: '',
      // request + requestThreshold needed for limit how many pages to load
      request: 0,
      requestThreshold: 3,
    }
  },

  created() {
    this.getArticleFrontPage();
  },

  methods: {
    async getArticleFrontPage() {

      // TODO: Only needed if repeatRequest fn stays
      // this.date = new Date();
      // const dateModified = modifyDateForApiRequest(this.date);
      const url = createApiRequest(this.newsDesk);
      const { docs } = await getArticles(url);
      this.request++;
      this.articles.push(...modifyArticlesForDisplay(docs));
    },

    async loadNextPage() {
      while (this.request < this.requestThreshold) {
        const url = createApiRequest(this.newsDesk, this.requestThreshold);
        const { docs } = await getArticles(url);
        this.articles = [...this.articles, ...modifyArticlesForDisplay(docs)];
        this.request++;
      } 
    },

    // TODO: Not sure if going one day back is still needed because of sort helper in api request (newest)
    // async repeatRequest() {
    //   // Get previous day as date string
    //   const prevDay = getPreviousDate(this.date);
    //   // Set date var to new date string
    //   this.date = prevDay;
    //   // Modify new date string to have correct format for request
    //   const newDateModified = modifyDateForApiRequest(prevDay);
    //   // Create url with new variable(s)
    //   const newUrl = createApiRequest(this.newsDesk, newDateModified);
    //   // Make request + retrieve docs
    //   const { docs } = await getArticles(newUrl);
    //   // Set articles array used for display
    //   this.articles = [...this.articles, ...modifyArticlesForDisplay(docs)];
    //   console.log('%carticles', 'color: hotpink; font-weight: bold;', this.articles);
    // }
  },

}
</script>