<template>
  <v-container class="d-flex flex-column justify-space-between">

    <AppOverline :overline="newsDesk" class="px-1" />

    <ArticleSliderSkeleton v-if="!articlesLoaded" />

    <article-slider
      :articlesForSlider="this.articles"
      v-if="this.articles.length"
    ></article-slider>

    <NavPillSkeleton v-if="!navPillsLoaded" />

    <v-row class="mt-3">
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
import ArticleSliderSkeleton from '../components/skeletons/ArticleSliderSkeleton.vue';
import NavPillSkeleton from '../components/skeletons/NavPillSkeleton.vue';
import AppOverline from '../components/AppOverline.vue';
import ArticleSlider from '../components/ArticleSlider.vue';
import NavPill from '../components/NavPill.vue'
import { getNewsDesk, createApiRequest, getArticles, modifyArticlesForDisplay, createArrayForNavPills } from '../modules/articles.mjs';

export default {

  name: 'CategoryPage',

  components: {
    ArticleSliderSkeleton,
    NavPillSkeleton,
    AppOverline,
    'article-slider': ArticleSlider,
    NavPill,
  },

  data() {
    return {
      articlesLoaded: false,
      navPillsLoaded: false,
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
      this.articlesLoaded = true;

      const filters = createArrayForNavPills(this.articles);
      this.filterNewsDesks = filters.news_desk;
      this.filterSections = filters.section;
      this.navPillsLoaded = true;

      // TODO if (res.status !== 200) schow error & return
      // HANDLE 429 too many requests
    },
  },
}
</script>