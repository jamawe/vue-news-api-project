<template> <!-- NOTE: Cannot use v-if on template-tag -->

  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        
        class="slider-container"
        >

        <!-- md="10" -->

        <div class="d-flex justify-start article-category"><span class="line-behind">{{ category }}</span></div>

        <div v-if="loaded">
          <tiny-slider v-bind="options" class="article-slider">
            <div v-for="(article, i) in articles" :key="i" class="px-1 slider-item">
              <!-- <router-link :to="`/${category}/${article.slug}`" class="text-decoration-none"> -->
              <router-link :to="{ name: 'ArticlePage', params: { articleDetail: article, slug: article.slug } }" class="text-decoration-none">
                <v-card
                  tile
                  elevation="0"
                  class="mx-auto"
                  max-width="300"
                  height="500"
                  color="#F5F5F5"
                
                >
                  <!-- TODO: Transparented Cover auf image, damit Titel besser zu lesen ist -->
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="article.urlToImage"
                  >
                
                  </v-img>
                  <!-- TODO: Titel und Text allgemein so stylen, dass Textumbrücher statisch oder besser sind? -->
                  
                  <v-card-title class="text-justify font-weight-bold">
                    <h4 class="article-title">
                      <span class="line-behind">{{ article.prettyTitle[1] }}</span>
                    </h4>
                  </v-card-title>

                  <v-card-subtitle class="mt-1 pb-1 article-meta black--text font-weight-bold">
                    {{ article.publishedAt }} - {{ article.prettyTitle[2] }}
                  </v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div class="article-description ">
                      {{ article.description }}
                    </div>
                  </v-card-text>

                  <!-- <v-card-actions>
                    <v-btn
                      color="black"
                      text
                      class="btn-share"
                    >
                      weiterlesen
                    </v-btn>
                  </v-card-actions> -->
                </v-card>
              </router-link>

            </div>
          </tiny-slider>
          <ul id="customize-controls" class="d-flex justify-end">
            <li id="prev" tabindex="-1" data-controls="prev" class="teal--text font-weight-bold mr-2 text-h2">&lsaquo;</li>
            <li id="next" tabindex="-1" data-controls="next" class="teal--text font-weight-bold mr-2 text-h2">&rsaquo;</li>
          </ul>
        </div>

      </v-col>
    </v-row>
  </v-container>

  
  

</template>

<script>
// import { bus } from '../main';
import axios from 'axios';
import VueTinySlider from 'vue-tiny-slider';

export default {
  data() {
    return {
      loaded: false,
      todayToAPIString: '',
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
        // controlsText: ['<span class="teal--text font-weight-bold mr-2 text-h2 d-flex justify-end" style="">&lsaquo;</span>', '<span class="teal--text font-weight-bold text-h2 d-flex justify-end">&rsaquo;</span>']
      },
      articles: [],
      sources: [
        'Spiegel Online', 'BUNTE.de', 'watson', 'tagesschau.de', 'Derwesten.de', 'N-tv.de', 'STERN.de', 'Faz.net', 'Bild', 'Www.rnd.de', 'Süddeutsche Zeitung', 'Rollingstone.de', 'Die Zeit', 'Handelsblatt', 'wallstreet-online', 'DIE WELT', 'T3n', 'merkur.de', 'Abendblatt.de', 'Wirtschafts Woche', 'Berliner Zeitung', 'Www.ndr.de', 'Www.hna.de', 'B.Z. Berlin', 'Thueringer-allgemeine.de', 'Augsburger Allgemeine', 'Www.swr.de', 'Www.waz.de', 'Berliner Morgenpost', 'heise online', 'Der Tagesspiegel', 'RP ONLINE', 'Stuttgarter Zeitung', 'Aerzteblatt.de', 'Focus', 'Spektrum.de', 'SPORT1', 'deichstube.de', 'Transfermarkt', 'Formel1.de', 'Eurosport.de', 'sportschau.de', 'DW (English)', '11freunde.de', 'PC-WELT', 'netzwelt', 'CHIP Online Deutschland', 'COMPUTER BILD', 'DER AKTIONÄR', 'Finanzen.net',
      ],
      model: 0,
      // currentCategory: this.category,
    }
  },
  props: {
    category: String,
  },
  components: {
    'tiny-slider': VueTinySlider,
  },
  created() {
    this.getDate();
    this.getArticles();
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
    getArticles() {

      // eslint-disable-next-line
      // console.log(this.category);

      axios.get(`https://newsapi.org/v2/top-headlines?country=de&category=${this.category}&from=${this.todayToAPIString}&to=${this.todayToAPIString}&pageSize=50&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`)
      .then(res => {

        const data = res.data.articles;

        for (let key in data) {
          const article = data[key];
            
          // Filtern nach Source names und check, dass keiner der values von content, description, title, url und urlToImage leer sind
          if (this.sources.includes(article['source']['name']) && (article['content']&&article['description']&&article['title']&&article['url']&&article['urlToImage'] != null)) {

            // Ersten Teil des Titels (vor " - ") als Titel anzeigen (mit articel.prettyTitle[1]), zweiten Teile (Name der Source) mit articel.prettyTitle[2]
            article['prettyTitle'] = article['title'].match(/(.*)\s-\s(.*)/)
            // eslint-disable-next-line
            // console.log(article['prettyTitle']);

            // Create slug from article.prettyTitle[1]
            // Remove any whitespace at beginning or end
            let slug = article['prettyTitle'][1].replace(/^\s+|\s+$/g, '');

            // Convert to lower case
            slug = slug.toLowerCase();

            // remove accents, swap ñ for n, etc
            let from = ['ä', 'ö', 'ü', 'ß'];
            let to   = ['ae', 'oe', 'ue', 'ss'];

            for (let key in from) {
              slug = slug.replace(new RegExp(from[key], 'g'), to[key]);
            }

            article['slug'] = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
              .replace(/\s+/g, '-') // collapse whitespace and replace by -
              .replace(/-+/g, '-'); // collapse dashes

            // eslint-disable-next-line
            console.log(article['content']);

            // Datumformat der Response ersetzen durch eigenes DE
            article['publishedAt'] = article['publishedAt'].replace(/T.*/,'').split('-').reverse().join('.');

            article['category'] = this.category;

            if (this.articles.length < 10) {
              this.articles.push(article);
            } else {
              break;
            }
            
          }
            
        }

        // eslint-disable-next-line
        console.log(this.articles);

        this.loaded = true;

      })
      // eslint-disable-next-line
      .catch(error => console.log(error));
    },
  },
  watch: {
    // eslint-disable-next-line
    $route(to, from) {
      // eslint-disable-next-line
      console.log('after', this.$route.params.category);
      this.getArticles();

    }
  }
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