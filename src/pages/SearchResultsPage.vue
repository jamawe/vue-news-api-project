<template>
  <v-container max-width="600">
    <AppHeader v-if="loaded !== null" :headerTitle="resultsTitle" />

    <v-expansion-panels class="expansion-panel-width expansion-panel-sticky mx-auto mb-8">
      <v-expansion-panel>
        <v-expansion-panel-header class="text-body-1">
          Modify your search
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-card
            color="transparent"
            elevation="0"
            max-width="600"
            class="mx-auto">
            <v-card-text
              class="mx-auto">
              <v-text-field
                prepend-icon="mdi-magnify"
                single-line
                placeholder="Enter your keyword(s)"
                :error="hasError"
                :error-messages="errors"
                id="search"
                @change="removeErrorState"
                v-model.trim="keyword"></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-autocomplete
                v-model="chosenNewsDesks"
                :items="newsDesks"
                outlined
                deletable-chips
                small-chips
                chips
                prepend-icon="mdi-filter-outline"
                label="Filter by news desk(s)"
                multiple
              ></v-autocomplete>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  elevation="0"
                  color="accent"
                  @click="startSearch">
                  Go
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <ArticleSingleSkeleton v-if="!loaded && !requestLimitExceeded" />

    <ArticleSingle
    v-for="(article, i) in articles"
    :key="i"
    :articleSingle="article" />

    <template v-if="requestLimitExceeded">
      <v-banner
        rounded
        max-width="600"
        class="mx-auto mb-8">
        The request limit has been exceeded. Your request will be repeated automatically in a few seconds and more articles will be displayed once it was successful.
        <template v-slot:actions>
          <v-btn
            text
            disabled
          >
            <template v-if="isRequesting">{{ retryMessage }}</template>
            <template v-else>Retry in {{ countdown }}</template>
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
  import ArticleSingle from '../components/ArticleSingle.vue';
  import ArticleSingleSkeleton from '../components/skeletons/ArticleSingleSkeleton.vue';
  import { createQueryRequest, getArticles, modifyArticlesForDisplay } from '../modules/articles.mjs';
  import { newsDesks } from '../modules/menu.mjs';

  export default {
    name: 'SearchResultsPage',

    components: {
        AppHeader,
        ArticleSingle,
        ArticleSingleSkeleton,
    },

    mounted() {
      this.submitSearch();
    },

    data() {
      return {
        loaded: null,
        resultsTitle: 'Your results',
        hasError: false,
        errors: [],
        keyword: '',
        newsDesks,
        chosenNewsDesks: [],
        queryString: '',
        newsDeskString: '',
        articles: [],
        showLazySkeleton: false,
        request: 0,
        requestLimitExceeded: false,
        isRequesting: false,
        countdown: 10,
        retryMessage: 'Requesting...',
      }
    },

    methods: {
      startSearch() {
        this.removeErrorState();
        if (!this.keyword) {
            this.hasError = true;
            this.errors.push('Please enter a keyword.');
            return;
        }

        const keywordString = this.formatQueryString(this.keyword);
        this.$router.push({ name: 'SearchResultsPage', query: { q: keywordString, news_desk: this.chosenNewsDesks.join(',') } });
      },

      async submitSearch() {
        this.articles = [];
        this.loaded = false;

        const newsDeskQueryParam = this.$route.query.news_desk.split(',');
        // Save search strings to data() for further requests
        this.newsDeskString = this.formatNewsDeskString(newsDeskQueryParam);
        this.queryString = this.$route.query.q;
        
        const url = createQueryRequest(this.queryString, this.newsDeskString);
        try {
          this.isRequesting = true;
          const { docs } = await getArticles(url);
          this.articles.push(...modifyArticlesForDisplay(docs));
        } catch (e) {
          // Handle 429, too many requests (>10 / 60sec)
          if (e.response.status === 429) {
            this.handleTooManyRequests(this.submitSearch);
          }
          return e.response.status;
        }
        
        // If request was successful
        this.requestLimitExceeded = false;
        this.request++; // Keeping track for page param in API request
        // For expansion panel
        this.keyword = this.$route.query.q.split('+').join(' ');
        this.chosenNewsDesks = newsDeskQueryParam;

        this.loaded = true;

        // Show skeleton that triggers new request on-intersect after some time
        // Use setTimeout to avoid an immediate trigger
        setTimeout(() => {
          this.showLazySkeleton = true;
        }, 3000);
      },

      async loadNextPage() {
        // Create request with saved query params + pagination
        const url = createQueryRequest(this.queryString, this.newsDeskString, this.request);

        try {
          this.isRequesting = true;
          const { docs } = await getArticles(url);
          this.articles.push(...modifyArticlesForDisplay(docs));
        } catch (e) {
          // Handle 429, too many requests (>10 / 60sec)
          if (e.response.status === 429) {
            this.handleTooManyRequests(this.loadNextPage);
          }
          return e.response.status;
        }

        this.requestLimitExceeded = false;
        this.request++;
        this.showLazySkeleton = false;

        setTimeout(() => {
          this.showLazySkeleton = true;
        }, 3000);
      },

      removeErrorState() {
        this.hasError = false;
        this.errors = [];
      },

      formatQueryString(value) {
        // Trim whitespace at beginning + end, replace whitespace with '+' char, replace double '+' with single '+'
        // 'term+term2'
        value = value.replace(/^\s+|\s+$/g, '').replace(/\s/g, '+').replace(/\++/g, '+');
        return value;
      },

      formatNewsDeskString(newsDesksArray) {
        let newsDeskString = '';
        newsDesksArray.forEach(item => newsDeskString += `"${item}" `); 
        // 'NewsDesk NewsDesk2'
        return newsDeskString.trim();
      },

      handleTooManyRequests(fnToRetry) {
        // Reset everything countdown related
        this.isRequesting = false;
        this.countdown = 10;

        // Do not show skeleton anymore, but exceeded info banner instead
        this.showLazySkeleton = false;
        this.requestLimitExceeded = true;

        const requestCountdown = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown -= 1;
          } else {
            clearInterval(requestCountdown);
            fnToRetry();
          }
        }, 1000);
      }
    },
  }
</script>

<style lang="scss">
  .expansion-panel-width {
    max-width: 600px;
  }

  .expansion-panel-sticky {
    position: sticky;
    top: 20px;
  }
</style>