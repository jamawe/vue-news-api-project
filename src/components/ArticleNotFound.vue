<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="ch70" elevation="0" color="transparent">
            <v-card-title class="font-xxl monospace keep-all mb-10">
                Ups! &#127770;
            </v-card-title>
            <v-card-text class="body-1">
                <div class="sans">
                    Der Artikel konnte nicht geladen werden. Bitte geh zur Kategorie oder Startseite zurück.
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    :to="{ name: 'CategoryPage', params: { category: category } }"
                    text
                    plain
                    x-large
                    :title="`${newsDesk} öffnen`"
                    >
                    <span class="monospace line-behind text-lowercase">
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
                    <span class="monospace line-behind text-lowercase">
                        Startseite
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import  { categories, getNewsDesk } from '../modules/articles.mjs';

    export default {
        name: 'ArticleNotFound',

        props: {
            category: String
        },

        data() {
            return {
                titleHomeLink: 'Zur Startseite',
                categorySlug: this.$route.params.category,
                // newsDesk: ,
                categories,
            }
        },

        computed: {
            newsDesk() {
                return getNewsDesk(this.categorySlug);
            }
        }
    }
</script>