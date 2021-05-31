<template>

  <v-container>
    <v-row>
      <v-col cols="12" class="mx-auto">
        <article-front-page :category="'general'"></article-front-page>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import ArticleFrontPage from '../components/ArticleFrontPage.vue';

export default {
  components: {
    'article-front-page': ArticleFrontPage,
  },
  data() {
    return {
      categories: [
        'business','entertainment','general','health','science','sports','technology'
      ],
    }
  },
  mounted() {
    // eslint-disable-next-line
    // console.log(this.$route.params);
    // console.log(this.$router.options.routes);
    
  }
}
</script>