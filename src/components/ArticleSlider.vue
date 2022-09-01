<template> <!-- NOTE: Cannot use v-if on template-tag -->

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" class="slider-container">

          <tiny-slider v-bind="options" class="article-slider">
            <div
              v-for="(article, i) in articles"
              :key="i"
              class="px-1 slider-item"
            >

              <router-link :to="{ name: 'ArticlePage', params: { articleDetail: article, slug: article.slug, articlesForGrid: articles } }" class="text-decoration-none">
                <v-card
                  tile
                  elevation="0"
                  class="mx-auto"
                  max-width="300"
                  height="500"
                  color="card"
                
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="article.urlToImage"
                  >
                
                  </v-img>
                  <!-- TODO: Titel und Text allgemein so stylen, dass Textumbrücher statisch oder besser sind? -->
                  
                  <v-card-title class="font-weight-bold">
                    <h4 class="article-title">
                      <span class="line-behind">{{ article.prettyTitle[1] }}</span>
                    </h4>
                  </v-card-title>

                  <v-card-subtitle class="monospace mt-1 pb-1 font-weight-bold">
                    {{ article.publishedAt }} - {{ article.prettyTitle[2] }}
                  </v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div class="article-description monospace">
                      {{ article.description }}
                    </div>
                  </v-card-text>
                </v-card>
              </router-link>

            </div>
          </tiny-slider>
          
          <ul id="customize-controls" class="d-flex justify-end">
            <li id="prev" tabindex="-1" data-controls="prev" class="teal--text font-weight-bold mr-2 text-h2">&lsaquo;</li>
            <li id="next" tabindex="-1" data-controls="next" class="teal--text font-weight-bold mr-2 text-h2">&rsaquo;</li>
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

<style scoped>

  .slider-container {
    position: relative;
  }

  .my-slider {
    position: relative;
  }

  .slider-item {
    padding: 1.5rem .75rem;
    position: relative;
  }

  li {
    list-style: none;
  }

  .article-title {
    word-break: normal;
    line-height: 1.6666rem;
    word-spacing: 0em;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align-last: left;
  }

  /* Truncate description multi-line */
  .article-title, .article-description {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  #customize-controls {
    margin: -1.5em 0;
  }

  /* Position .btn-share on bottom of .slider-item (parent) */
  .btn-share {
    display: inline-block;
    position: absolute;
    bottom: .5rem;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  
</style>