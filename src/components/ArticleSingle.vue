<template>
  <v-container class="article-single">

       <v-row>
        <v-col
          cols="12" class="mx-auto">

          <header>
            <v-row>
              <v-col
                cols="10" class=" mx-auto mb-5">

                <v-img :src="articleSingle.urlToImage" class="article-image"></v-img>

              </v-col>
            </v-row>
          </header>

         <article>
            <v-row>
              <v-col
              cols="10" class="monospace mx-auto">

                <div class="sans mb-3"><h1><span>{{ articleSingle.prettyTitle[1] }}</span></h1></div>

                
                <div class="text-subtitle-2">
                  <span class="sans">
                    {{ articleSingle.publishedAt }} &mdash; {{ articleSingle.prettyTitle[2] }}
                  </span>
                </div>

              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="10" class="mx-auto">

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
                  <span class="line-behind sans mr-1">Auf {{ articleSingle.prettyTitle[2] }} lesen</span>
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

<style scoped>

  .article-image {
    box-shadow: 10px 10px #26A69A;
  }

</style>