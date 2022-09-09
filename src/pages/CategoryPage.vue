<template>
  <v-container class="d-flex flex-column justify-space-between">

    <AppOverline :overline="newsDesk" />

    <article-slider
      :articlesForSlider="this.articles"
      v-if="this.articles.length"
    ></article-slider>

    <v-row class="mt-5">
      <v-col>
        <v-chip-group column>
          <template v-if="filterNewsDesks">
            <NavPill v-for="newsDesk in filterNewsDesks" :key="newsDesk" :filter="{ fq: 'news_desk', content: newsDesk}" />
          </template>
          <template v-if="filterSections">
            <NavPill v-for="section in filterSections" :key="section" :filter="{ fq: 'news_desk', content: section}" />
          </template>
        </v-chip-group>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import AppOverline from '../components/AppOverline.vue';
import ArticleSlider from '../components/ArticleSlider.vue';
import NavPill from '../components/NavPill.vue'
import { getNewsDesk, createApiRequest, getArticles, modifyArticlesForDisplay, createArrayForNavPills } from '../modules/articles.mjs';

export default {

  name: 'CategoryPage',

  components: {
    AppOverline,
    'article-slider': ArticleSlider,
    NavPill,
  },

  data() {
    return {
      loaded: false,
      articles: [],
      category: this.$route.params.category,
      newsDesk: '',
      filterNewsDesks: [],
      filterSections: [],
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

      const filters = createArrayForNavPills(this.articles);
      this.filterNewsDesks = filters.news_desk;
      this.filterSections = filters.section;

      // TODO if (res.status !== 200) schow error & return
      // HANDLE 429 too many requests
    },
  },
}
</script>