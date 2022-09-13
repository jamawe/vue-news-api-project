<template>
    <v-row>
        <v-col class="pb-1">
            <!-- <div class="text-overline">
                <span v-if="onArticlePage">
                    <router-link :to="{ name: 'CategoryPage', params: { category: category } }" class="overline__link text-decoration-none">{{ overline }}</router-link>
                </span>
                <span v-else-if="!onArticlePage">{{ overline }}</span>

            </div> -->
            <v-skeleton-loader
                tile
                type="heading"></v-skeleton-loader>
        </v-col>
    </v-row>
</template>
