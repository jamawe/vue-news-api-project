<template>
  <v-container>
    
    <AppHeader :headerTitle="headerTitle" />

    <ArticleSingleSkeleton v-if="!loaded && !requestLimitExceeded" />

    <ArticleSingle
      v-for="(article, i) in articles"
      :key="i"
      :articleSingle="article"
    />

    <template v-if="requestLimitExceeded">
      <v-banner
        rounded
        max-width="600"
        class="mx-auto mb-8">
        The request limit has been exceeded. Your request will be repeated automatically in a few seconds and more articles will be displayed once it was successful.
        <template v-slot:actions>
          <v-btn
            text
            color="primary"
          >
            Dismiss
          </v-btn>
          <v-btn
            text
            disabled
          >
            Retry in 10
          </v-btn>
        </template>
      </v-banner>

      <ArticleSingleSkeleton />
    </template>

    <!-- .quiet modifier determines that handler will only be executed once the threshold is met -->
    <ArticleSingleSkeleton
      v-if="showLazySkeleton"
      v-intersect.quiet="{
        handler: loadNextPage,
        options: {
          threshold: [1.0]
        }
      }" />

  </v-container>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import ArticleSingleSkeleton from '../components/skeletons/ArticleSingleSkeleton.vue';
import ArticleSingle from '../components/ArticleSingle.vue';
// import ArticleSearch from '../components/ArticleSearch.vue';
import articleMixin from '../mixins/articleMixin';
import { createApiRequest, getArticles, modifyArticlesForDisplay } from '../modules/articles.mjs';

export default {

  name: 'HomePage',

  components: {
    AppHeader,
    ArticleSingleSkeleton,
    ArticleSingle,
    // ArticleSearch,
  },

  mixins: [ articleMixin ],

  data() {
    return {
      loaded: false,
      headerTitle: 'Recent',
      articles: [],
      newsDesk: '"Culture" "Foreign" "Magazine" "Politics" "Sports"',
      isSection: false,
      docs: [],
      showLazySkeleton: false,
      requestLimitTimeout: '',
      requestLimitExceeded: false,
      // request + requestThreshold needed for limit how many pages to load
      request: 0, // TODO skip if 429 limit of api should be used instead (see below)
      requestThreshold: 20, // TODO skip if 429 limit of api should be used instead (see below)
    }
  },

  created() {
    this.getArticles();
  },

  methods: {
    async getArticles() {
      // Clear timeout if there was one from former request
      if (this.requestLimitTimeout) clearTimeout(this.requestLimitTimeout);
      
      const url = createApiRequest(this.newsDesk);

      try {
        const { docs } = await getArticles(url);
        this.docs = docs;
      } catch (e) {
        // Handle 429, too many requests (>10 / 60sec)
        if (e.response.status === 429) {
          this.handleTooManyRequests(this.getArticles);
        }
        return e.response.status;
      }
      
      // If request was successful
      this.requestLimitExceeded = false;
      this.request++; // TODO maybe skip, since mechanismn without threshold implemented (but keep for example for  CatgeoryPage)
      this.articles.push(...modifyArticlesForDisplay(this.docs));
      this.loaded = true;

      // Show skeleton that triggers new request on-intersect after some time
      // Use setTimeout to avoid an immediate trigger
      setTimeout(() => {
        this.showLazySkeleton = true;
      }, 3000);
    },

    async loadNextPage() {
      // Clear timeout if there was one from former request
      if (this.requestLimitTimeout) clearTimeout(this.requestLimitTimeout);

      // TODO maybe skip (+else if below), since mechanismn without threshold implemented (but keep for example for  CatgeoryPage)
      if (this.request < this.requestThreshold) {
        const url = createApiRequest(this.newsDesk, this.isSection, this.request);
        try {
          const { docs } = await getArticles(url);
          this.docs = docs;
        } catch (e) {
          // Handle 429, too many requests (>10 / 60sec)
          if (e.response.status === 429) {
            this.handleTooManyRequests(this.loadNextPage);
          }
          return e.response.status;
        }
        this.requestLimitExceeded = false;
        this.request++;
        this.articles.push(...modifyArticlesForDisplay(this.docs));
        this.showLazySkeleton = false;
        
        // TODO maybe skip, since mechanismn without threshold implemented (but keep for example for  CatgeoryPage)
        // Show lazy skeleton again if own threshold is not exceeded
        if (this.request < this.requestThreshold) {
          // Show skeleton that triggers new request on-intersect after some time
          // Use setTimeout to avoid an immediate trigger
          setTimeout(() => {
            this.showLazySkeleton = true;
          }, 3000);
        } 
      
      } else if (this.request >= this.requestThreshold) {
        // Handle if of threshold got exceeded
        // TODO maybe skip, since mechanismn without threshold implemented (but keep for example for  CatgeoryPage)
        console.log('%cOWN threshold exceeded!!!', 'color: crimson; font-weight: bold;');
        this.showLazySkeleton = false;
      }
    },

    handleTooManyRequests(fnToRetry) {
      // Do not show skeleton anymore, but exceeded info banner instead
      this.showLazySkeleton = false;
      this.requestLimitExceeded = true;

      // Retry same request after some time
      this.requestLimitTimeout = setTimeout(() => {
        // Try first api request again after 5000ms
        fnToRetry();
      }, 5000);
    }

    // loadLazySkeleton() {
    //   console.log('%cloadLazySkeleton run, showLazySkeleton', 'color: purple; font-weight: bold;', this.showLazySkeleton);
    //   this.showLazySkeleton = true;
    // },

    // TODO: Not sure if going one day back is still needed because of sort helper in api request (newest)
    // async repeatRequest() {
    //   // Get previous day as date string
    //   const prevDay = getPreviousDate(this.date);
    //   // Set date var to new date string
    //   this.date = prevDay;
    //   // Modify new date string to have correct format for request
    //   const newDateModified = modifyDateForApiRequest(prevDay);
    //   // Create url with new variable(s)
    //   const newUrl = createApiRequest(this.newsDesk, newDateModified);
    //   // Make request + retrieve docs
    //   const { docs } = await getArticles(newUrl);
    //   // Set articles array used for display
    //   this.articles = [...this.articles, ...modifyArticlesForDisplay(docs)];
    //   console.log('%carticles', 'color: hotpink; font-weight: bold;', this.articles);
    // }
  },

}
</script>