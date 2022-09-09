<template>
  <v-container>

    <AppHeader :headerTitle="newsDesk" />

    <article-slider
      :articlesForSlider="this.articles"
      v-if="this.articles.length"
    ></article-slider>

  </v-container>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import ArticleSlider from '../components/ArticleSlider.vue';
import { getNewsDesk, createApiRequest, getArticles, modifyArticlesForDisplay } from '../modules/articles.mjs';

export default {

  name: 'CategoryPage',

  components: {
    AppHeader,
    'article-slider': ArticleSlider,
  },

  data() {
    return {
      loaded: false,
      articles: [],
      category: this.$route.params.category,
      newsDesk: '',
    }
  },

  created() {
    this.getArticles();
  },

  methods: {
    async getArticles() {
      this.newsDesk = getNewsDesk(this.category);
      const url = createApiRequest(this.newsDesk);
      const { docs } = await getArticles(url);
      this.articles.push(...modifyArticlesForDisplay(docs));

      // TODO if (res.status !== 200) schow error & return
      // HANDLE 429 too many requests
    },
  },

}
</script>