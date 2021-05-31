<template> <!-- NOTE: Cannot use v-if on template-tag -->
  <v-container>
    <v-row>
      <v-col
        cols="12" class="mx-auto">

        <div v-if="loaded">
          <header>
            <v-row>
              <v-col
                cols="12" class=" mx-auto mb-5">
                <div class="article-meta-row article-category mb-5"><span class="line-behind">{{ articleFrontPage[0].category }}</span></div>
                  <v-img :src="articleFrontPage[0].urlToImage" class="article-image"></v-img>
              </v-col>
            </v-row>
          </header>

          <article>
            <v-row>
              <v-col
                cols="12" class="mx-auto article-meta">
                <div class="article-meta-row article-title mb-3"><h1><span>{{ articleFrontPage[0].prettyTitle[1] }}</span></h1></div>
                <!-- <div class="article-meta-row article-description mb-3"><h4><span class="font-weight-regular">{{ articleDetail.description }}</span></h4></div> -->
            
                <div class="article-meta-row article-meta"><h4><span class="line-behind">{{ articleFrontPage[0].publishedAt }} 	&mdash; {{ articleFrontPage[0].prettyTitle[2] }}</span></h4></div>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12" class="mx-auto article-main">
                <p>
                  {{ articleFrontPage[0].description }} &mdash; <br>
                  <!-- <a :href="articleFrontPage[0].url" target="_blank" class="text-decoration-none black--text line-behind article-link"> -->
                  <router-link
                    :to="`/${category}`"
                    class="text-decoration-none black--text line-behind article-link">
                    <span >mehr aus dieser Kategorie</span>
                  </router-link>
                </p>
              </v-col>
            </v-row>
          </article>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import articleMixin from '../mixins/articleMixin';

export default {
  name: 'ArticleFrontPage',
  mixins: [ articleMixin ],
  data() {
    return {
      loaded: false,
      todayToAPIString: '',
      articleFrontPage: [],
      sources: [
        'Spiegel Online', 'BUNTE.de', 'watson', 'tagesschau.de', 'Derwesten.de', 'N-tv.de', 'STERN.de', 'Faz.net', 'Bild', 'Www.rnd.de', 'Süddeutsche Zeitung', 'Rollingstone.de', 'Die Zeit', 'Handelsblatt', 'wallstreet-online', 'DIE WELT', 'T3n', 'merkur.de', 'Abendblatt.de', 'Wirtschafts Woche', 'Berliner Zeitung', 'Www.ndr.de', 'Www.hna.de', 'B.Z. Berlin', 'Thueringer-allgemeine.de', 'Augsburger Allgemeine', 'Www.swr.de', 'Www.waz.de', 'Berliner Morgenpost', 'heise online', 'Der Tagesspiegel', 'RP ONLINE', 'Stuttgarter Zeitung', 'Aerzteblatt.de', 'Focus', 'Spektrum.de', 'SPORT1', 'deichstube.de', 'Transfermarkt', 'Formel1.de', 'Eurosport.de', 'sportschau.de', 'DW (English)', '11freunde.de', 'PC-WELT', 'netzwelt', 'CHIP Online Deutschland', 'COMPUTER BILD', 'DER AKTIONÄR', 'Finanzen.net',
      ],
      model: 0,
    }
  },
  props: {
    category: String,
  },
  created() {
    this.getDate();
    this.getArticleFrontPage();
  },
  methods: {
    getDate() {
      // Get today's date and format it toNewsAPIs convention (yyyy-mm-dd)
      const today = new Date();

      let year = '' + today.getFullYear();
      let month = '' + (today.getMonth() + 1);
      let day = '' + today.getDate();

      if (month.length < 2) {
        month = '0' + month;
      }

      if (day.length < 2) {
        day = '0' + day;
      }

      this.todayToAPIString = [year, month, day].join('-');
    },
    getArticleFrontPage() {

      axios.get(`https://newsapi.org/v2/top-headlines?country=de&category=${this.category}&from=${this.todayToAPIString}&to=${this.todayToAPIString}&pageSize=10&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
      .then(res => {

        const data = res.data.articles;

        // eslint-disable-next-line
        console.log("data:", data, data[0].urlToImage);


        for (let key in data) {
          const article = data[key];
            
          // Filtern nach Source names und check, dass keiner der values von content, description, title, url und urlToImage leer sind
          if (this.sources.includes(article['source']['name']) && (article['content']&&article['description']&&article['title']&&article['url']&&article['urlToImage'] != null)) {

            article['prettyTitle'] = this.makePrettyTitle(article['title']);

            article['slug'] = this.makeSlug(article['prettyTitle'][1]);

            article['publishedAt'] = this.makePrettyDate(article['publishedAt']);

            article['category'] = this.category;

            if (this.articleFrontPage.length < 1) {
              this.articleFrontPage.push(article);
            } else {
              break;
            }
            
          }
            
        }

        // eslint-disable-next-line
        // console.log(this.articleFrontPage);

        this.loaded = true;

      })
      // eslint-disable-next-line
      .catch(error => console.log(error));
    },
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
  }

  .article-meta, .article-description, .article-category {
    font-family: 'Courier New', Courier, monospace;
  }

  /* Truncate description multi-line */
  .article-title, .article-description {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }

  /* Position .btn-share on bottom of .slider-item (parent) */
  .btn-share {
    display: inline-block;
    position: absolute;
    bottom: .5rem;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
</style>