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
  created() {
    // eslint-disable-next-line
    // console.log(this.articleDetail['description']);
    this.prettyContent();
  },
  methods: {
    prettyContent() {

      // / : start/ end of the regex
      // * : 0 or more occurrences of the preceding item

      this.articleDetail['content'] = this.articleDetail['content'].replace(/ *\[[^\]]*]/, '');

      // eslint-disable-next-line
      // console.log(this.articleDetail['content']);
    },
  }
}
</script>
