<template>
    <v-col cols="12" class="py-0">
        <v-card
            tile
            elevation="0"
            height="auto"
            color="transparent"
            max-width="600"
            class="width-whole mx-auto py-2"
            >
            <div class="d-flex flex-no-wrap justify-space-between">
                  <div class="width-whole">
                    <v-card-text class="text-overline py-1">
                        <span v-if="article.section">{{ article.section }}</span>
                        <span v-else-if="article.newsDesk">{{ article.newsDesk }}</span>
                    </v-card-text>
                    <v-card-title
                      class="text-subtitle-1 pt-0"
                    ><span class="article-box-title serif keep-all  headline-preview">{{ article.headline }}</span></v-card-title>
                  </div>
                  <v-avatar
                    v-if="article.image"
                    class="ma-3"
                    size="125"
                    tile
                  >
                    <v-img :src="article.image"></v-img>
                  </v-avatar>
                </div>
                
          </v-card>
          <v-divider class="mx-2"></v-divider>
    </v-col>
      
</template>

<script>
    export default {
        name: 'ArticleHeadlinePreview',

        props: {
            article: Object,
            articlesForGrid: Array,
            category: String,
        }
    }
</script>

<style lang="scss">
    .headline-preview {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
</style>