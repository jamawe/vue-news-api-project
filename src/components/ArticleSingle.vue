<template>
  <v-card
    tile
    elevation="0"
    color="transparent"
    max-width="600"
    class="mb-12 mx-auto" >

    <v-img v-if="articleSingle.image" :src="articleSingle.image" class="rounded mb-2"></v-img>

    <v-card-title>
      <div class="serif text-h5">
        <span class="serif keep-all font-weight-bold">{{ articleSingle.headline }}</span>
      </div>
    </v-card-title>

    <v-card-text class="pb-0">
      <div class="body-1">{{ articleSingle.abstract }}</div>
    </v-card-text>

    <v-card-subtitle class="text-subtitle-2">
      {{ articleSingle.pubDate }}
      <span v-if="articleSingle.byline">&ndash; {{ articleSingle.byline }}</span>
    </v-card-subtitle>
  
    <v-card-text>
      <div class="line-height-body body-1 text--primary">
        <span class="serif">{{ articleSingle.content }} &mdash;</span>
      </div>
    </v-card-text>

    <div class="pb-4">
      <NavPill v-if="articleSingle.newsDesk"
        toRouteName="CategoryPage"
        :category="articleSingle.newsDeskSlug"
        :isSection="false"
        :fqTerm="articleSingle.newsDesk"
        :disabled="false" />

      <NavPill v-if="articleSingle.section"
        toRouteName="CategoryPage"
        :category="articleSingle.sectionSlug"
        :isSection="true"
        :fqTerm="articleSingle.section"
        :disabled="false" />


      <NavPill v-if="articleSingle.subSection"
        toRouteName="CategoryPage"
        :category="articleSingle.subSectionSlug"
        :isSection="true"
        :fqTerm="articleSingle.subSection"
        :disabled="true" />
    </div>

    <v-card-actions class="d-flex">
      <v-btn :href="articleSingle.url"
        target="_blank"
        :title="title"
        elevation="0"
        rounded
        color="accent"
        class="px-3">
        Read On
        <v-icon small class="ml-1">mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>

    <v-divider v-if="onHomePage" class="mx-4 mt-8"></v-divider>
    
  </v-card>
</template>

<script>
import NavPill from './NavPill.vue';

export default {

  name: 'ArticleSingle',

  components: {
    NavPill
  },

  props: {
    articleSingle: Object,
  },

  data() {
    return {
      title: 'Read whole article',
      onHomePage: this.$route.name === 'HomePage',
    }
  }
  
}
</script>

<style>
  .article-image {
    box-shadow: 5px 7.5px #26A69A;
  }
</style>