<template>
    <v-fab-transition>
        <v-btn
        @click="scrollToTop"
        :color="`accent ${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`"
        fab
        small
        fixed
        class="fab-position"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
</template>

<script>
export default {
    name: 'BackToTopButton',

    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .fab-position {
        bottom: 70px;
        right: 20px;
    }
</style>