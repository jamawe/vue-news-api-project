<template>
  <v-container class="article-single">
       <v-row>
        <v-col class="mx-auto">

          <header>
            <v-row>
              <v-col
                sm="10"
                lg="8"
                xl="5"
                class=" mx-auto mb-5">

                <v-img :src="articleSingle.image" class="article-image"></v-img>

              </v-col>
            </v-row>
          </header>

         <article>
            <v-row>
              <v-col
                sm="10"
                lg="8"
                xl="5" 
                class="monospace mx-auto">

                <div class="sans mb-3 panda"><h1><span>{{ articleSingle.headline }}</span></h1></div>

                
                <div class="text-subtitle-2">
                  <span class="sans">
                    {{ articleSingle.pubDate }} &mdash; {{ articleSingle.byline }}
                  </span>
                </div>

              </v-col>
            </v-row>

            <v-row>
              <v-col
                sm="10"
                lg="8"
                xl="5"
                class="mx-auto">

                <p class="monospace font-italic panda">{{ articleSingle.abstract }}
                </p>

                <p class="monospace">
                  {{ articleSingle.content }} &mdash;
                </p>

                <v-btn
                  :href="articleSingle.url"
                  target="_blank"
                  :title="title"
                  text
                  plain
                >
                  <span class="line-behind sans mr-1">Auf {{ articleSingle.source }} lesen</span>
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>

              </v-col>
            </v-row>

          </article>

        </v-col>
      </v-row> 
  </v-container>
</template>

<script>
export default {

  name: 'ArticleSingle',

  props: {
    articleSingle: Object,
  },

  data() {
    return {
      title: 'Ganzen Artikel lesen',
    }
  }
  
}
</script>

<style>
  .article-image {
    box-shadow: 10px 10px #26A69A;
  }
</style>