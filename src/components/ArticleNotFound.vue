<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="ch70" elevation="0" color="transparent">
            <v-card-title class="font-xxl keep-all mb-10">
                Sorry! &#129488;
            </v-card-title>
            <v-card-text class="body-1 mb-10">
                <div v-if="newsDesk !== undefined">
                    It is not (yet) possible to retrieve single articles. Please navigate back to the page of the {{ newsDesk }} news desk or to the landing page. Thank you!
                </div>
                <div v-else>
                    The news desk you reuqested could not be retireved. Please choose one from the menu or navigate to the landing page.
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    v-if="newsDesk !== undefined"
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