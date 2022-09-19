<template>
  <v-container max-width="600">
        <AppHeader v-if="loaded !== null" :headerTitle="resultsTitle" />
        <ArticleSingleSkeleton v-if="loaded === false" />

        <template v-else-if="loaded === true">
          <v-card
            max-width="600"
            class="mx-auto mb-8">
            <v-card-text
                class="mx-auto">
                <v-text-field
                    prepend-icon="mdi-magnify"
                    single-line
                    placeholder="Enter your keyword(s)"
                    :error="hasError"
                    :error-messages="errors"
                    id="search"
                    @input="removeErrorState"
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

            <v-card-actions class="py-6">
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

          <ArticleSingle
          v-for="(article, i) in articles"
          :key="i"
          :articleSingle="article" />
        </template>
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
        articles: [],
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
        const newsDeskString = this.formatNewsDeskString(newsDeskQueryParam);
        console.log('%cnewsDeskForRequest', 'color: pink; font-weight: bold;', newsDeskString);

        const queryString = this.$route.query.q;

        console.log('%ckeywordQueryParams', 'color: pink; font-weight: bold;', queryString);
        
        const url = createQueryRequest(queryString, newsDeskString);
        const { docs } = await getArticles(url);
        this.articles.push(...modifyArticlesForDisplay(docs));
        console.log('%carticles', 'color: pink; font-weight: bold;', this.articles);
        this.keyword = this.$route.query.q.split('+').join(' ');
        this.chosenNewsDesks = newsDeskQueryParam;

        this.loaded = true;
      },

      removeErrorState() {
        this.hasError = false;
        this.errors = [];
      },

      formatQueryString(value) {
        value = value.replace(/^\s+|\s+$/g, '').replace(/\s/g, '+').replace(/\++/g, '+');
        return value;
      },

      formatNewsDeskString(newsDesksArray) {
        let newsDeskString = '';
        newsDesksArray.forEach(item => newsDeskString += `"${item}" `);
        return newsDeskString.trim();
      }
    },
  }
</script>