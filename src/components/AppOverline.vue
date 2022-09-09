<template>
    <v-row>
        <v-col class="pb-0">
            <div class="text-overline">{{ overline }}
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            overline: String,
        }
    }
</script>