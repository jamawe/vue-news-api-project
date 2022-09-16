<template>
    <v-container max-width="600">
        <AppHeader :headerTitle="headerTitle" class="my-2" />
        <v-card
            max-width="600"
            class="mx-auto mb-8">
            <v-card-text
                class="mx-auto">
                <v-text-field
                    prepend-icon="mdi-magnify"
                    single-line
                    placeholder="Enter your keyword(s) *"
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
                    @click="submitSearch">
                    Go
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>

        <ArticleSingleSkeleton v-if="loaded === false" />

        <template v-else-if="loaded === true">
            <AppHeader :headerTitle="resultsTitle" class="my-2" />
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
        name: 'SearchPage',

        components: {
            AppHeader,
            ArticleSingle,
            ArticleSingleSkeleton,
        },

        data() {
            return {
                loaded: null,
                headerTitle: 'Keyword search',
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
            async submitSearch() {
                this.removeErrorState();
                if (!this.keyword) {
                    this.hasError = true;
                    this.errors.push('Please enter a keyword.');
                    return;
                }

                this.articles = [];
                this.loaded = false;

                const newsDeskString = this.formatNewsDeskString(this.chosenNewsDesks)

                const queryString = this.formatQueryString(this.keyword);
                const url = createQueryRequest(queryString, newsDeskString);
                const { docs } = await getArticles(url);
                this.articles.push(...modifyArticlesForDisplay(docs));

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