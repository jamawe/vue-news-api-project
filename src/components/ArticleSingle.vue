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
              cols="10" class="mx-auto article-meta">

                <div class="article-meta-row article-title mb-3"><h1><span>{{ articleSingle.prettyTitle[1] }}</span></h1></div>

                
                <div class="article-meta-row article-meta">
                  <h4>
                    <span class="line-behind">
                      {{ articleSingle.publishedAt }} &mdash; {{ articleSingle.prettyTitle[2] }}
                    </span>
                  </h4>
                </div>

              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="10" class="mx-auto article-main">

                <p>
                  {{ articleSingle.content }} &mdash; <br>
                  <a
                    :href="articleSingle.url"
                    target="_blank"
                    class="text-decoration-none black--text font-weight-bold line-behind article-link"
                  >
                    Zur Quelle
                  </a>
                </p>

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
  
}
</script>

<style scoped>

  .article-image {
    box-shadow: 10px 10px #26A69A;
  }

  .article-category, .article-description, .article-meta, .article-main {
    font-family: 'Courier New', Courier, monospace;
  }

  .article-title {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

</style>