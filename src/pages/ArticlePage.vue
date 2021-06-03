<template>
  <v-container>

      <v-row>
        <v-col
          cols="12" class="mx-auto">

          <article-single
            :articleSingle="this.articleDetail"
          ></article-single>

        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ArticleSingle from '../components/ArticleSingle.vue';

export default {
  name: 'ArticlePage',
  components: {
    'article-single': ArticleSingle,
  },
  props: {
    articleDetail: Object,
    slug: String,
  },
}
</script>
