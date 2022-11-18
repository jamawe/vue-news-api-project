<template>
  <v-container class="d-flex flex-column justify-space-between">

    <AppOverlineSkeleton v-if="!overline" class="pt-2 px-1" />
    <AppOverline v-else-if="overline" :overline="overline" class="px-1" />

    <ArticleSliderSkeleton v-if="!articlesLoaded" />
    <ArticleSlider
      v-else-if="articlesLoaded && this.articles.length"
      :articlesForSlider="this.articles" />

    <NavPillSkeleton v-if="!navPillsLoaded" />
    <v-row v-else-if="navPillsLoaded && uniqueFilters" class="mt-3">
      <v-col>
        <v-chip-group column>

            <NavPill v-for="item in uniqueFilters" :key="item.category"
              toRouteName="CategoryPage"
              :category="item.category"
              :isSection="item.isSection"
              :fqTerm="item.fqTerm"
              :disabled="item.disabled" />

        </v-chip-group>
      </v-col>
    </v-row>

    <CategoryNotFound v-if="error"
      :message="error" />

  </v-container>
</template>

<script>
import AppOverlineSkeleton from '../components/skeletons/AppOverlineSkeleton.vue';
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
    AppOverlineSkeleton,
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
      overline: '',
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
        this.setArticles(filterQueryTerm, docs, true, true);
      } else if (docs.length === 0) {
        this.getArticlesFallback(filterQueryTerm, !this.isSection);
      }

      // TODO if (res.status !== 200) show error & return
      // HANDLE 429 too many requests
    },

    async getArticlesFallback(term, isSection) {
      const url = createApiRequest(term, isSection);
      const { docs } = await getArticles(url);

      if (docs.length !== 0) {
        this.setArticles(term, docs, true, true);
      } else if (docs.length === 0) {
        this.overline = 'Invalid Category';
        this.articlesLoaded = true;
        this.navPillsLoaded = true;
        this.error = `No articles could be found for the category "${term}". Please try choosing a news desk from the menu or navigate to the landing page.`
      }
    },

    deriveFilterQueryFromSlug(categorySlug) {
      // Replace - with spaces
      const filterQueryTerm = categorySlug.replace(/-/g, ' ');
      return filterQueryTerm;
    },

    // On successful request, populate articles + overline + nav pills to render
    setArticles(overline, docs, articlesLoaded, navPillsLoaded) {
      this.overline = overline;
      this.articles.push(...modifyArticlesForDisplay(docs));
      this.articlesLoaded = articlesLoaded;
      this.filters = createArrayForNavPills(this.articles);
      this.navPillsLoaded = navPillsLoaded;
    }
  },
}
</script>