<template>
  <v-card
    tile
    elevation="0"
    color="transparent"
    max-width="600"
    class="mb-12 mx-auto" >

    <v-img v-if="articleSingle.image" :src="articleSingle.image" class="mb-2"></v-img>

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
      <v-chip v-if="articleSingle.newsDesk" pill outlined color="accent" class="text-button ma-2">#{{ articleSingle.newsDesk }}</v-chip>
      <v-chip v-if="articleSingle.section" pill outlined color="accent" class="text-button ma-2">#{{ articleSingle.section }}</v-chip>
      <v-chip v-if="articleSingle.subSection" pill outlined color="accent" class="text-button ma-2">#{{ articleSingle.subSection }}</v-chip>
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
    {{ routeName }}
    <v-divider v-if="onHomePage" class="mx-4 mt-8"></v-divider>
  </v-card>
</template>

<script>
export default {

  name: 'ArticleSingle',

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