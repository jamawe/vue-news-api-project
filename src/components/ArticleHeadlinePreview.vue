<template>
    <v-col cols="12" sm="6" class="mx-auto py-0">

        <v-hover>
          <template v-slot="{ hover }">

            <router-link
              :to="{ name: 'ArticlePage', params: { articleDetail: article, category: category, slug: article.slug, articlesForGrid: articlesForGrid } }"
              class="text-decoration-none"
              :title="titleArticle">
              <v-card
                  tile
                  elevation="0"
                  height="auto"
                  color="transparent"
                  class="mx-auto py-2">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-text class="text-overline" style="line-height:130%;">
                        <span v-if="article.subSection">{{ article.subSection }}</span>
                        <span v-else-if="article.section">{{ article.section }}</span>
                        <span v-else-if="article.newsDesk">{{ article.newsDesk }}</span>
                    </v-card-text>
                    <v-card-title class="headline-preview__title text-subtitle-1 text-md-h6 pt-0">
                      <span class="article-box-title serif keep-all headline-preview">{{ article.headline }}</span>
                  </v-card-title>
                  <v-card-subtitle v-if="article.byline" class="d-none d-md-flex pt-2">
                    {{ article.byline }}
                  </v-card-subtitle>
                  </div>
                  <v-avatar
                    v-if="article.image"
                    class="ma-3"
                    size="125"
                    tile>
                    <v-img :src="article.image"></v-img>
                  </v-avatar>

                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      opacity="0.125"
                      :color="`accent ${$vuetify.theme.dark ? 'lighten-1' : 'lighten-4'}`"
                    >
                    </v-overlay>
                  </v-fade-transition>
            
                </div>
              </v-card>
            </router-link>

          </template>
        </v-hover>

        <v-divider class="mx-2" max-width="400"></v-divider>
    </v-col>
      
</template>

<script>
  export default {
    name: 'ArticleHeadlinePreview',

    props: {
      article: Object,
      articlesForGrid: Array,
      category: String,
    },

    data() {
      return {
        titleArticle: 'Open article',
      }
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