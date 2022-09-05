<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mx-auto">

        <div class="monospace d-flex justify-center">
          <span class="line-behind text-lowercase">{{ categoryName }}</span>
        </div>

        <article-slider
          :articlesForSlider="this.articles"
          v-if="this.articles.length && loaded"
        ></article-slider>

        <!-- {{ this.articles }} -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleSlider from '../components/ArticleSlider.vue';
import axios from 'axios';
import articleMixin from '../mixins/articleMixin';
import categoryMixin from '../mixins/categoryMixin';

export default {

  name: 'CategoryPage',

  components: {
    'article-slider': ArticleSlider,
  },

  mixins: [ articleMixin, categoryMixin ],

  data() {
    return {
      loaded: false,
      articles: [],
      category: this.$route.params.category,
      categoryName: '',
    }
  },

  created() {
    this.getArticles();
    this.todayToAPIString;
    this.getDate(new Date());
  },

  methods: {
    async getArticles() {

      const i = this.getCategoryIndex(this.category);
      const newsDesk = this.getNewsDesk(i);
      this.categoryName = newsDesk;
      // Get date TODO

      const res = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${newsDesk}") AND pub_date:(2022-09-01)&api-key=${process.env.VUE_APP_NYT_API_KEY}`);

      // TODO if (res.status !== 200) schow error & return

      const { docs, meta } = res.data.response;
      // if (meta.hits === 0) make new request with previous date

      // TODO make date pretty
      
      docs.forEach(element => {
        const article = {
          abstract: element.abstract,
          byline: element.byline.original,
          category: this.category,
          content: element.lead_paragraph,
          headline: element.headline.main,
          image: `https://www.nytimes.com/${element.multimedia[0].url}`,
          newsDesk: element.news_desk,
          pubDate: this.makePrettyDate(element.pub_date),
          slug: this.makeSlug(element.headline.main),
          source: element.source,
          subCategory: element.subsection_name,
          url: element.web_url,
          wordCount: element.word_count
        };

        this.articles.push(article);
      });

      this.loaded = true;
    },

    // apiRequest(newsDesk, date) {

    // },

    getDate(date) {
        // const previous = new Date(date.getTime());
        // previous.setDate(date.getDate() - 1);

        let year = '' + date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

        if (month.length < 2) {
          month = '0' + month;
        }

        if (day.length < 2) {
          day = '0' + day;
        }

        return [year, month, day].join('-');
    },
  },

  computed: {
    todayToAPIString() {
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

        return [year, month, day].join('-');
    },
  },

}
</script>