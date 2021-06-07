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

    <!-- {{ filteredArray }} class="d-flex justify-space-around" -->
    <v-row>
      <v-col cols="10" class="mx-auto">
        <div ><h2 class="heading-more mb-2">Mehr aus dieser Kategorie</h2>
        <hr></div>
      </v-col>
    </v-row>

    <v-row v-if="filteredArray.length" class="" >
      <!-- <v-col
        cols="12"
        > -->
        
        <article-box
          v-for="(article, i) in filteredArray"
          :key="i"
          :article="article"
          :articlesForGrid="articlesForGrid"
        ></article-box>
      <!-- </v-col> -->
    </v-row>

  </v-container>
</template>

<script>
import ArticleSingle from '../components/ArticleSingle.vue';
import ArticleBox from '../components/ArticleBox.vue';

export default {
  name: 'ArticlePage',
  components: {
    'article-single': ArticleSingle,
    'article-box': ArticleBox,
  },
  props: {
    articleDetail: Object,
    slug: String,
    articlesForGrid: Array,
  },
  mounted() {
    // eslint-disable-next-line
    console.log('SLUG!!! ', this.filteredArray)
  },
  computed: {
    filteredArray() {
      let currentSlug = this.$route.params.slug;

      let newArray = this.articlesForGrid.filter((object) => {
        return object.slug !== currentSlug;
      });

      let count = 0;
      
      for (let key in newArray) {
        const article = newArray[key];

        if (count < 1) {
          article['flex'] = 8;
          article['imgWidth'] = 'auto';
          article['imgHeight'] = 'auto';
          article['cardWidth'] = 'auto';
          count++;
        } else {
          article['flex'] = 5;
            article['imgWidth'] = 200;
            article['imgHeight'] = 200;
            article['cardWidth'] = 200;
          count++;
        }

        // count < 1 ? article['flex'] = 8 : article['flex'] = 5;

        // count++;

      }

      return newArray;

    }
  }
}
</script>

<style scoped>
  .heading-more {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
</style>
