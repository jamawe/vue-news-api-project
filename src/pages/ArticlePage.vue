<template>
  <v-container v-if="articleDetail !== undefined">
    <v-row>
      <v-col cols="10" class="mx-auto">
        
        <div class="monospace article-meta-row mb-1">
          <router-link :to="{ name: 'CategoryPage', params: { category: category } }" class="text-decoration-none text-lowercase" :title="`${categoryName} öffnen`"><span class="line-behind">{{ categoryName }}</span>
          </router-link>
        </div>

      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12" class="mx-auto">

        <article-single
          :articleSingle="this.articleDetail"
        ></article-single>

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="10" class="mx-auto">
        <div ><h2 class="sans mb-2">Mehr aus dieser Kategorie</h2>
        <hr></div>
      </v-col>
    </v-row>

    <v-row v-if="filteredArray.length">
        
        <article-box
          v-for="(article, i) in filteredArray"
          :key="i"
          :article="article"
          :articlesForGrid="articlesForGrid"
        ></article-box>
    </v-row>
  </v-container>

  <article-not-found
    v-else
    :category="category"></article-not-found>
</template>

<script>
import ArticleSingle from '../components/ArticleSingle.vue';
import ArticleBox from '../components/ArticleBox.vue';
import ArticleNotFound from '../components/ArticleNotFound.vue';
import categoryMixin from '../mixins/categoryMixin';

export default {

  name: 'ArticlePage',

  components: {
    'article-single': ArticleSingle,
    'article-box': ArticleBox,
    'article-not-found': ArticleNotFound,
  },

  mixins: [ categoryMixin ],

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

      return newArray;

    },

    categoryName() {
        const slug = this.category;
        const [category] = this.categories.filter(object => object.slug === slug);
        return category.name;
    },
  },

}
</script>