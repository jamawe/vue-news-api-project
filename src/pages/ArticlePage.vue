<template>
  <v-container v-if="articleDetail !== undefined">

    <AppOverline :overline="articleDetail.newsDesk" />
    
    <v-row>
      <v-col class="mx-auto">

        <article-single
          :articleSingle="this.articleDetail"
        ></article-single>

      </v-col>
    </v-row>

    <v-row>
      <v-col class="mx-auto">
        <div class="text-h5 mb-2">
          <span class="serif keep-all font-italic pl-1 mb-2">More from the {{ articleDetail.newsDesk }} news desk</span>
          <hr>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="filteredArray.length">
          <article-box
            v-for="(article, i) in filteredArray"
            :key="i"
            :article="article"
            :articlesForGrid="articlesForGrid"
            :category="category"
          ></article-box>
    </v-row>
  </v-container>

  <ArticleNotFound v-else :category="category" />
</template>

<script>
import AppOverline from '../components/AppOverline.vue';
import ArticleSingle from '../components/ArticleSingle.vue';
import ArticleBox from '../components/ArticleBox.vue';
import ArticleNotFound from '../components/ArticleNotFound.vue';

export default {

  name: 'ArticlePage',

  components: {
    AppOverline,
    'article-single': ArticleSingle,
    'article-box': ArticleBox,
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
      title: 'Zur Kategorie',
    }
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

      }

      console.log('%cnewArray', 'color: darkseagreen; font-weight: bold;', newArray);
      return newArray;

    },
  },

}
</script>