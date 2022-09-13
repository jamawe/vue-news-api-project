<template>
    <v-container class="full-height d-flex justify-center align-center">
        <v-card class="ch70 align-self-center" elevation="0" color="transparent">
            <v-card-title class="font-xxl keep-all mb-10">
                Oops! &#129488;
            </v-card-title>
            <v-card-text class="body-1 mb-10">
                <div>
                    {{ message }}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    :to="{ name: 'HomePage' }"
                    text
                    plain
                    x-large
                    outlined
                    :title="titleHomeLink"
                    >
                    <span class="accent--text">
                        Home
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'CategoryNotFound',

        props: {
            message: String,
        },

        data() {
            return {
                titleHomeLink: 'Navigate Home'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .full-height {
        min-height: 100vh;
    }
</style>