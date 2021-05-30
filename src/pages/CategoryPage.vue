<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mx-auto">
        <article-slider
          :category="this.currentCategory"
          v-if="this.currentCategory.length"
        ></article-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleSlider from '../components/ArticleSlider.vue';

export default {
  components: {
    'article-slider': ArticleSlider,
  },
  data() {
    return {
      // Path aus Params
      currentCategory: this.$route.params.category,
    }
  },
  mounted() {
    // eslint-disable-next-line
    // console.log(this.$route);

    // eslint-disable-next-line
    // console.log(this.$route.to);

    // this.currentCategory = this.$route.params.category;

    // eslint-disable-next-line
    // console.log(typeof this.currentCategory);
  }
}
</script>