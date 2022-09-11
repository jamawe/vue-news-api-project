<template>
    <v-row>
        <v-col class="pb-1">
            <div class="text-overline">
                <span v-if="onArticlePage">
                    <router-link :to="{ name: 'CategoryPage', params: { category: category } }" class="overline__link text-decoration-none">{{ overline }}</router-link>
                </span>
                <span v-else-if="!onArticlePage">{{ overline }}</span>

            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'AppOverline',
        
        props: {
            overline: String,
        },

        data() {
            return {
                onArticlePage: this.$route.name === 'ArticlePage',
                category: this.$route.params.category,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .overline__link {
        transition: all 150ms ease-out;

        &:hover {
            color: var(--v-accent-base);
        }
    }
</style>