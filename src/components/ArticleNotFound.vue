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
                elevation="0">{{ category }}</v-btn>
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
        }
    }
</script>