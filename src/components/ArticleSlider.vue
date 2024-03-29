<template> <!-- NOTE: Cannot use v-if on template-tag -->

  <v-container class="pb-5">
    <v-row justify="center">
      <v-col class="slider-container pa-0">

          <tiny-slider v-bind="options" class="article-slider">
            <div
              v-for="(article, i) in articles"
              :key="i"
              class="px-1 slider-item"
            >

              <v-hover>
                <template v-slot="{ hover }">
                  <router-link v-if="article" :to="{ name: 'ArticlePage', params: { articleDetail: article, slug: article.slug, articlesForGrid: articles } }" class="text-decoration-none" :title="titleArticle">
                    <v-card
                      tile
                      elevation="0"
                      class="rounded mx-auto"
                      max-width="300"
                      height="500"
                      color="card"
                    >
                      <v-img
                        v-if="article.image"
                        height="200"
                        :src="article.image"
                      ></v-img>
                      <v-sheet
                        v-else-if="!article.image"
                        height="200"
                        :color="`card ${$vuetify.theme.dark ? 'lighten-1' : 'darken-2'}`"
                      ></v-sheet>
                  
                      <v-card-title>
                        <h4 class="text-h5">
                          <span class="article-title serif keep-all font-weight-bold">{{ article.headline }}</span>
                        </h4>
                      </v-card-title>
                      <v-card-subtitle class="text-subtitle-2 mt-1">
                        <div class="article-byline ">{{ article.pubDate }} <span v-if="article.byline">&ndash; {{ article.byline }}</span></div>
                      </v-card-subtitle>
                      <v-card-text class="body-1">
                        <div class="article-abstract text--primary">
                          {{ article.abstract }}
                        </div>
                      </v-card-text>

                      <v-fade-transition>
                        <v-overlay
                          v-if="hover"
                          absolute
                          opacity="0.125"
                          :color="`accent ${$vuetify.theme.dark ? 'lighten-1' : 'lighten-4'}`"
                        >
                        </v-overlay>
                      </v-fade-transition>

                    </v-card>
                  </router-link>
                </template>
              </v-hover>

            </div>
          </tiny-slider>
          
          <ul id="customize-controls" class="d-flex justify-end pt-1">
            <v-hover v-slot="{ hover }">
                <li id="prev" tabindex="-1" data-controls="prev" class="controls font-weight-bold mr-2 text-h2 pointer" :title="titlePrev" :class="{ 'on-hover': hover }">&lsaquo;</li>
                
            </v-hover>
            <v-hover v-slot="{ hover }">
              <li id="next" tabindex="-1" data-controls="next" class="controls font-weight-bold mr-2 text-h2 pointer" :title="titleNext" :class="{ 'on-hover': hover }">&rsaquo;</li>
            </v-hover>
          </ul>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import VueTinySlider from 'vue-tiny-slider';

export default {

  data() {
    return {
      articles: this.articlesForSlider,
      options: {
        container: '.article-slider',
        items: 1,
        fixedWidth: 300,
        loop: false,
        nav: false,
        lazyload: true,
        controlsPosition: 'bottom',
        controlsContainer: '#customize-controls',
        prevButton: '#prev',
        nextButton: '#next',
      },
      model: 0,
      titleArticle: 'View Article',
      titlePrev: 'Previous',
      titleNext: 'Next',
    }
  },

  props: [
    'articlesForSlider'
  ],

  components: {
    'tiny-slider': VueTinySlider,
  },

}
</script>

<style lang="scss" scoped>

  .slider-container {
    position: relative;
  }

  .my-slider {
    position: relative;
  }

  .slider-item {
    padding: 1rem .75rem;
    position: relative;
  }

  li {
    list-style: none;
  }

  /* .article-title {
    word-break: normal;
    line-height: 1.6666rem;
    word-spacing: 0em;
    text-align-last: left;
  } */

  /* Truncate description multi-line */
  .article-title {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  .article-abstract {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  .article-byline {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  #customize-controls {
    margin: -1.5em 0;
  }

  .controls.on-hover {
    color: var(--v-accent-base);
  }

  /* Position .btn-share on bottom of .slider-item (parent) */
  .btn-share {
    display: inline-block;
    position: absolute;
    bottom: .5rem;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
</style>