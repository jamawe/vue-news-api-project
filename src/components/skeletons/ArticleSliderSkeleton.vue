<template>
    <v-container class="pa-3 mt-4">
        <v-row class="d-flex flex-column">
            <v-col class="d-flex px-0" cols="12">
                <v-skeleton-loader
                    v-for="i in attrs.n" :key="i"
                    :class="attrs.class"
                    :min-width="attrs.minWidth"
                    :type="attrs.type"
                ></v-skeleton-loader>
            </v-col>
            <v-col class="d-flex justify-end px-0 pb-0">
                <v-skeleton-loader
                    type="button"    
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'ArticleSliderSkeleton',

        data() {
            return {
                attrs: {
                    n: 3,
                    class: 'px-1',
                    minWidth: 300,
                    type: 'image, card-heading, list-item, list-item-three-line',
                }
            }
        }
    }
</script>