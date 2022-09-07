<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="ch70" elevation="0" color="transparent">
            <v-card-title class="title-xl monospace keep-all mb-10">
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
                    :title="`${categoryName} öffnen`"
                    >
                    <span class="monospace line-behind text-lowercase">
                        {{ categoryName }}
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
    import  { categories } from '../modules/articles.mjs';

    export default {
        name: 'ArticleNotFound',

        props: {
            category: String
        },

        data() {
            return {
                titleHomeLink: 'Zur Startseite',
                categories,
            }
        },

        computed: {
            categoryName() {
                const slug = this.$route.params.category;
                const [category] = this.categories.filter(object => object.slug === slug);
                return category.name;
            }
        }
    }
</script>