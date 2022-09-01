<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="pa-2" max-width="50%" min-width="300" elevation="0" outlined>
            <v-card-title class="keep-all">
                Ups! Der Artikel konnte nicht geladen werden.
            </v-card-title>
            <v-card-text>
                <div>Bitte geh zur Kategorie oder Startseite zurück.</div>
            </v-card-text>
            <v-card-actions>
            <v-btn
                :to="{ name: 'CategoryPage', params: { category: category } }"
                elevation="0">{{ categoryName }}</v-btn>
            <v-btn
                text
                plain
                :to="{ name: 'HomePage' }"
                >Startseite</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'ArticleNotFound',

        props: {
            category: String
        },

        data() {
            return {
                categories: [
                    { name: 'Wirtschaft', slug: 'business' },
                    { name: 'Unterhaltung', slug: 'entertainment' },
                    { name: 'Allgemeines', slug: 'general' },
                    { name: 'Gesundheit', slug: 'health' },
                    { name: 'Wissenschaft', slug: 'science' },
                    { name: 'Sport', slug: 'sports' },
                    { name: 'Technik', slug: 'technology' },
                ],
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