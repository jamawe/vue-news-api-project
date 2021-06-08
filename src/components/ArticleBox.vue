<template>

  <v-col :cols="article.flex" class="mx-auto mb-0">
    <v-lazy 
      v-model="isActive" 
      :options="{ threshold: .5 }"
      min-height="200"
      transition="fade-transition"
      >
    <router-link :to="{ name: 'ArticlePage', params: { articleDetail: article, category: article.category, slug: article.slug, articlesForGrid: articlesForGrid } }" class="text-decoration-none">
      <v-card
        tile
        elevation="0"
        :max-width="article.cardWidth"
        height="auto"
        color="white"
        class="mx-auto"
        >
        <v-img
          
          :max-width="article.imgWidth"
          :height="article.imgHeight"
          :src="article.urlToImage"
          
          class="black--text align-end article-box-image"
        >
        </v-img>
        <v-card-title
            class="font-weight-light px-0"
          >
          <h6 class="article-box-title"><span >{{ article.prettyTitle[1] }}</span></h6>
        </v-card-title>
      </v-card>
    </router-link>
    </v-lazy>
  </v-col>
  
</template>

<script>
export default {
  name: 'ArticleBox',
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    article: Object,
    articlesForGrid: Array,
  },
  mounted() {
    // eslint-disable-next-line
    console.log('Mit FLEX?', this.article);
  }
}
</script>

<style scoped>
  /* TODO: box-shadow on hover? */
  .article-box-image {
    box-shadow: 7.5px 7.5px #26A69A;
  }

  .article-box-title {
    font-size: 1rem;
    font-family: 'Courier New', Courier, monospace;
    line-height: 1.3rem;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    /* text-overflow: ellipsis;
    white-space: nowrap; */
    overflow: hidden;
  }
</style>
