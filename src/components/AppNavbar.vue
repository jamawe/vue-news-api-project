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

      <v-toolbar-title class="pl-0">
        <v-btn
          :to="{ name: 'HomePage' }"
          :title="titleHome"
          plain
          text
          x-large
          class="pa-0">

          <span class="serif tracking-normal font-md text-capitalize font-weight-bold font-italic">Vuews</span>

        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn icon @click="toggleTheme" class="text--primary">
        <v-icon v-if="!$vuetify.theme.dark" :title="titleDarkTheme">mdi-moon-waxing-crescent</v-icon>
        <v-icon v-else :title="titleLightTheme">mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/jamawe/vue-news-api-project"
        :title="titleGithub"
        icon>
        <v-icon class="text--primary">mdi-github</v-icon>
      </v-btn>
    
    </v-app-bar>

    <v-dialog
      v-model="drawer"
      scrollable
      max-width="500">

      <v-card
        tile>
        <v-card-text 
          class="pb-0">
            <v-container
              v-for="item in menu"
              :key="item.heading"
              class="mb-4">
              <v-row class="mb-4">
                <v-col class="text-center">
                    <v-card-title
                      class="d-flex justify-center serif font-md tracking-wider text-capitalize font-weight-bold font-italic text--primary">
                        {{ item.heading }}
                    </v-card-title>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex flex-wrap">
                <v-col
                  v-for="category in item.categories"
                  :key="category.name"
                  cols="6"
                  class="my-height-2 text-center" style="height: 50px;">
                      <v-btn @click="drawer=false" text exact :to="{ name: `${category.toRouteName}`, params: { category: category.params.category, isSection: category.params.isSection }}">{{ category.name }}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon
            bottom
            color="#BDBDBD"
            @click="drawer=false"
            :title="titleMenuClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
  
</template>

<script>
  import { menu } from '../modules/menu.mjs';

  export default {

    data() {
      return {
        drawer: false,
        titleMenuOpen: 'Open Navigation',
        titleMenuClose: 'Close Navigation',
        titleHome: 'Navigate Home',
        titleDarkTheme: 'Choose Dark Theme',
        titleLightTheme: 'Choose Light Theme',
        titleGithub: 'Open project on GitHub',
        newsDesks: [],
        menu,
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