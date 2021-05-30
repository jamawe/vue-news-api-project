<template>
  <v-container>

      <v-row>
        <v-col
          cols="12" class="mx-auto">

          <header>
            <v-row>
              <v-col
                cols="8" class=" mx-auto mb-5">

                <div class="article-meta-row article-category mb-5"><span class="line-behind">{{ articleDetail.category }}</span></div>

                <v-img :src="articleDetail.urlToImage" class="article-image"></v-img>

              </v-col>
            </v-row>
          </header>

          <article>
            <v-row>
              <v-col
              cols="8" class="mx-auto article-meta">

                <div class="article-meta-row article-title mb-3"><h1><span>{{ articleDetail.prettyTitle[1] }}</span></h1></div>

                <!-- <div class="article-meta-row article-description mb-3"><h4><span class="font-weight-regular">{{ articleDetail.description }}</span></h4></div> -->
                
                <div class="article-meta-row article-meta"><h4><span class="line-behind">{{ articleDetail.publishedAt }} 	&mdash; {{ articleDetail.prettyTitle[2] }}</span></h4></div>

              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="8" class="mx-auto article-main">

                <p>
                  {{ articleDetail.content }} &mdash;

                  <a :href="articleDetail.url" target="_blank" class="text-decoration-none black--text line-behind article-link">
                    <span >weiterlesen</span>
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
  name: 'ArticlePage',
  props: {
    articleDetail: Object,
    slug: String,
  },
  created() {
    // eslint-disable-next-line
    // console.log(this.articleDetail['description']);
    this.prettyContent();
  },
  methods: {
    prettyContent() {

      // / : start/ end of the regex
      // * : 0 or more occurrences of the preceding item

      this.articleDetail['content'] = this.articleDetail['content'].replace(/ *\[[^\]]*]/, '');

      // eslint-disable-next-line
      // console.log(this.articleDetail['content']);
    },
  }
}
</script>

<style scoped>

  .img-container {
    position: relative;
  }

  .img-back {
    filter: blur(4px);
    filter: opacity(50%);
    /* z-index: 0; */
    -webkit-filter: blur(4px);
    /* transform: scale(1.5);  */
  }

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