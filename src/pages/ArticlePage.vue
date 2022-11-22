<template>
  <v-container v-if="articleDetail !== undefined">

    <AppOverline :overline="articleDetail.newsDesk" class="top-width mx-auto"/>
    
    <v-row>
      <v-col class="mx-auto">

        <article-single
          :articleSingle="this.articleDetail"
        ></article-single>

      </v-col>
    </v-row>

    <v-row>
      <v-col class="top-width mx-auto pb-0">
        <div class="text-h6 text-center pb-2">
          More {{ articleDetail.newsDesk }} Headlines
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row v-if="filteredArticlesForGrid.length" class="top-width mx-auto">
      <ArticleHeadlinePreview
        v-for="(article, i) in filteredArticlesForGrid"
        :key="i"
        :article="article"
        :articlesForGrid="articlesForGrid"
        :category="category" />
    </v-row>
  </v-container>

  <ArticleNotFound v-else :category="category" />
</template>

<script>
import AppOverline from '../components/AppOverline.vue';
import ArticleSingle from '../components/ArticleSingle.vue';
import ArticleHeadlinePreview from '../components/ArticleHeadlinePreview.vue';
import ArticleNotFound from '../components/ArticleNotFound.vue';

export default {

  name: 'ArticlePage',

  components: {
    AppOverline,
    'article-single': ArticleSingle,
    ArticleHeadlinePreview,
    ArticleNotFound,
  },

  props: {
    articleDetail: Object,
    slug: String,
    articlesForGrid: Array,
  },

  data() {
    return {
      category: this.$route.params.category,
    }
  },

  computed: {
    filteredArticlesForGrid() {
      const currentSlug = this.$route.params.slug;
      const articlesWithoutCurrent = this.articlesForGrid.filter(article => article.slug !== currentSlug);

      return articlesWithoutCurrent;
    },
  },

}
</script>

<style lang="scss">
  .top-width {
    max-width: 800px;
  }
</style>