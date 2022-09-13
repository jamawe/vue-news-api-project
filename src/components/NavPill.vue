<template>
    <v-chip
        pill
        outlined
        :disabled="disabled"
        color="accent"
        class="text-button ma-2"
        :to="{ name: `${toRouteName}`, params: { category: category, isSection: isSection, fqTerm: fqTerm } }">

         {{ fqTerm }}

    </v-chip>
</template>

<script>
    export default {
        props: {
            toRouteName: String,
            category: String,
            isSection: Boolean,
            fqTerm: String,
            disabled: Boolean
        }
    }
</script>