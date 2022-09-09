<template>
    <v-chip pill outlined color="accent" class="text-button ma-2" :data-fq="filter.fq">#{{ filter.content }}</v-chip>
</template>

<script>
    export default {
        props: {
            filter: Object
        }
    }
</script>