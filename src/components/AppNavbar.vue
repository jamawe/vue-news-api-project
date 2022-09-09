<template>
  <div class="nav-container">
    <v-app-bar
    app
    dense
    bottom
    flat
    elevate-on-scroll>
    
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      :title="titleMenuOpen">
    </v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-btn
        :to="{ name: 'HomePage' }"
        :title="titleHome"
        plain
        text
        x-large
        class="pa-0">

        <span class="serif tracking-normal font-md text-lowercase font-weight-bold">Home</span>

      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <v-btn icon @click="toggleTheme">
      <v-icon v-if="!$vuetify.theme.dark" color="#3F51B5" :title="titleDarkTheme">mdi-moon-waxing-crescent</v-icon>
      <v-icon v-else color="#FFB300" :title="titleLightTheme">mdi-white-balance-sunny</v-icon>
    </v-btn>
    <v-btn
      href="https://github.com/jamawe/vue-news-api-project"
      :title="titleGithub"
      icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
    
    </v-app-bar>

    <v-dialog
      v-model="drawer"
      max-width="500">

      <v-card
        tile>
        <v-card-text class="pb-0">
          <v-list class="text-center">
            <v-list-item-group>

              <v-list-item v-for="(category, i) in categories" :key="i" @click="drawer=false" :to="{ name: 'CategoryPage', params: { category: category.slug } }" class="text-decoration-none" :title="`${category.name} öffnen`">
                <v-list-item-title>
                  <span class="serif tracking-normal font-sm text-capitalize font-weight-bold font-italic">{{ category.name }}</span>
                </v-list-item-title>
              </v-list-item>

            </v-list-item-group>

          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="#BDBDBD"
            @click="drawer=false"
            :title="titleMenuClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
  
</template>

<script>
  import  { categories } from '../modules/articles.mjs';

  export default {

    data() {
      return {
        drawer: false,
        titleMenuOpen: 'Navigation öffnen',
        titleMenuClose: 'Navigation schließen',
        titleHome: 'Zur Startseite',
        titleDarkTheme: 'Dunklen Modus wählen',
        titleLightTheme: 'Hellen Modus wählen',
        titleGithub: 'Projekt auf GitHub öffnen',
        newsDesks: [],
        categories,
      }
    },

    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('nap-dark', this.$vuetify.theme.dark);
      }
    }
  }
</script>

<style scoped>
  .drawer-title {
    word-break: keep-all;
    text-align: center;
  }  
</style>