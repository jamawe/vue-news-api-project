<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="ch70" elevation="0" color="transparent">
            <v-card-title class="font-xxl keep-all mb-10">
                Sorry! &#129488;
            </v-card-title>
            <v-card-text class="body-1 mb-10">
                <div>
                    It is not (yet) possible to retrieve single articles. Please navigate back to the page of the {{ newsDesk }} news desk or to the landing page. Thank you!
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    :to="{ name: 'CategoryPage', params: { category: category } }"
                    text
                    plain
                    x-large
                    outlined
                    :title="`Open ${newsDesk}`"
                    >
                    <span class="accent--text">
                        {{ newsDesk }}
                    </span>
                </v-btn>
                <v-btn
                    :to="{ name: 'HomePage' }"
                    text
                    plain
                    x-large
                    :title="titleHomeLink"
                    >
                    <span class="text--primary">
                        Home
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import { getNewsDesk } from '../modules/articles.mjs';

    export default {
        name: 'ArticleNotFound',

        props: {
            category: String
        },

        created() {
            window.document.title = `404 Article Not Found — Vuews`;
        },

        data() {
            return {
                titleHomeLink: 'Navigate Home',
                categorySlug: this.$route.params.category,
            }
        },

        computed: {
            newsDesk() {
                return getNewsDesk(this.categorySlug);
            }
        }
    }
</script>