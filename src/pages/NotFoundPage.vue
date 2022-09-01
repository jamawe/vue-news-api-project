<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="ch70" tile elevation="0" color="transparent">
            <v-card-title class="title-xl monospace mb-10 text-center font-weight-bolder">
                404 &#128301;
            </v-card-title>
            <v-card-text class="body-1">
                <div class="sans">
                    Diese Seite konnte nicht gefunden werden.
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    :to="{ name: 'HomePage' }"
                    text
                    plain
                    x-large
                    >
                    <span class="monospace line-behind text-lowercase">
                        Startseite
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>