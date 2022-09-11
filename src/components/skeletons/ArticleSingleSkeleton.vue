<template>
    <div>
        <v-skeleton-loader
            class="mx-auto"
            max-width="600"
            type="image"
        ></v-skeleton-loader>
        <v-skeleton-loader
            :class="attrs.class"
            max-width="600"
            type="heading"
        ></v-skeleton-loader>
        <v-skeleton-loader
            :class="attrs.class"
            max-width="600"
            type="paragraph@2"
        ></v-skeleton-loader>
        <v-skeleton-loader
            :class="attrs.class"
            max-width="600"
            type="chip"
        ></v-skeleton-loader>
        <v-skeleton-loader
            :class="attrs.class"
            max-width="600"
            type="chip"
        ></v-skeleton-loader>
    </div>
</template>

<script>
    export default {
        name: 'ArticleSingleSkeleton',

        data() {
            return {
                attrs: {
                    class: 'px-4 my-4 mx-auto'
                }
            }
        }
    }
</script>