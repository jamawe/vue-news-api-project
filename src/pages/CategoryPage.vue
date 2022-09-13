<template>
  <v-container class="d-flex flex-column justify-space-between">

    <AppOverline :overline="newsDesk" class="px-1" />

    <CategoryNotFound v-if="error"
      :message="error" />

    <ArticleSliderSkeleton v-if="!articlesLoaded" />

    <ArticleSlider
      :articlesForSlider="this.articles"
      v-if="this.articles.length" />

    <NavPillSkeleton v-if="!navPillsLoaded" />

    <v-row class="mt-3">
      <v-col>
        <v-chip-group column>

          <template v-if="uniqueFilters">

            <NavPill v-for="item in uniqueFilters" :key="item.category"
              toRouteName="CategoryPage"
              :category="item.category"
              :isSection="item.isSection"
              :fqTerm="item.fqTerm"
              :disabled="item.disabled" />

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
import NavPill from '../components/NavPill.vue';
import CategoryNotFound from '../components/CategoryNotFound.vue';

import { getNewsDesk, createApiRequest, getArticles, modifyArticlesForDisplay, createArrayForNavPills } from '../modules/articles.mjs';

export default {

  name: 'CategoryPage',

  components: {
    ArticleSliderSkeleton,
    NavPillSkeleton,
    AppOverline,
    ArticleSlider,
    NavPill,
    CategoryNotFound,
  },

  props: {
    isSection: Boolean,
    fqTerm: String,
  },

  data() {
    return {
      articlesLoaded: false,
      navPillsLoaded: false,
      articles: [],
      category: this.$route.params.category,
      newsDesk: '',
      filters: [],
      error: '',
    }
  },

  computed: {
    uniqueFilters() {
      if (this.filters.length) {
        return this.filters.filter(item => item.category !== this.category);
      }
    }
  },

  created() {
    this.getArticles();
  },

  methods: {
    async getArticles() {
      // Derive filter query term from category param
      const filterQueryTerm = this.deriveFilterQueryFromSlug(this.category);
      // try to make request with news_desk
      // if news_desk request fails try to make request with section_name
      // this.newsDesk = this.fqTerm; only if request successful
      const url = createApiRequest(filterQueryTerm, this.isSection);
      const { docs } = await getArticles(url);
      if (docs.length !== 0) {
        this.articles.push(...modifyArticlesForDisplay(docs));
        this.articlesLoaded = true;
        this.filters = createArrayForNavPills(this.articles);
        this.navPillsLoaded = true;
      } else if (docs.length === 0) {
        this.getArticlesFallback(filterQueryTerm, !this.isSection);
      }

      // TODO if (res.status !== 200) schow error & return
      // HANDLE 429 too many requests
    },

    async getArticlesFallback(term, isSection) {
      const url = createApiRequest(term, isSection);
      const { docs } = await getArticles(url);

      if (docs.length !== 0) {
        this.articles.push(...modifyArticlesForDisplay(docs));
        this.articlesLoaded = true;
        this.filters = createArrayForNavPills(this.articles);
        this.navPillsLoaded = true;
      } else if (docs.length === 0) {
        this.articlesLoaded = true;
        this.navPillsLoaded = true;
        this.error = `No articles could be found for the category "${term}". Please try choosing a news desk from the menu or navigate to the landing page.`
      }
    },

    deriveFilterQueryFromSlug(categorySlug) {
      // Replace - with spaces
      const filterQueryTerm = categorySlug.replace(/-/g, ' ');
      return filterQueryTerm;
    }
  },
}
</script>