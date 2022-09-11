<template>
    <v-row class="mt-3">
      <v-col>
        <v-chip-group column>
            <v-skeleton-loader 
                v-for="i in attrs.n"
                :class="attrs.class"
                :type="attrs.type"
            ></v-skeleton-loader>
        </v-chip-group>
      </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'NavPillSkeleton',

        data() {
            return {
                attrs: {
                    n: 3,
                    class: 'ma-2',
                    type: 'chip',
                }
            }
        }
    }
</script>