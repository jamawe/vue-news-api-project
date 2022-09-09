<template>
    <v-container class="d-flex justify-center align-center height-whole">
        <v-card class="ch70" tile elevation="0" color="transparent">
            <v-card-title class="font-xxl mb-10">
                404 &#128301;
            </v-card-title>
            <v-card-text class="body-1 mb-10">
                <div class="sans">
                    The page you requested could not be found.
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    :to="{ name: 'HomePage' }"
                    text
                    plain
                    x-large
                    outlined
                    title="Navigate Home"
                    >
                    <span class="accent--text">
                        Home
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>