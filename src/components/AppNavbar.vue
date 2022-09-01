<template>

  <div class="nav-container">
    <v-app-bar
    app
    dense
    bottom
    flat
    elevate-on-scroll
    >
    
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      :title="titleMenuOpen">
    </v-app-bar-nav-icon>

    <v-toolbar-title>
      <router-link to="/" class="text-decoration-none" :title="titleHome">
        <span class="monospace line-behind">aktuell</span>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <v-btn icon @click="toggleTheme">
      <v-icon v-if="!$vuetify.theme.dark" color="#3F51B5" :title="titleDarkTheme">mdi-moon-waxing-crescent</v-icon>
      <v-icon v-else color="#FFB300" :title="titleLightTheme">mdi-white-balance-sunny</v-icon>
    </v-btn>
    
    </v-app-bar>

    <v-dialog
      v-model="drawer"
      width="500"
    >

      <v-card
        tile
      >
        <v-card-title class="d-flex justify-center text-h6 mb-0"><span class="drawer-title sans">Wofür interessierst du dich?</span>
        </v-card-title>


        <v-card-text>
          <v-list class="text-center">
            <v-list-item-group>

              <v-list-item v-for="(category, i) in categories" :key="i" @click="drawer=false" :to="{ name: 'CategoryPage', params: { category: category.slug } }" class="text-decoration-none" :title="`${category.name} öffnen`">
                <v-list-item-title>
                  <span class="monospace line-behind">{{ category.name }}</span>
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
            class="mb-2"
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
  import categoryMixin from '../mixins/categoryMixin.js';

  export default {

    mixins: [ categoryMixin ],

    data() {
      return {
        drawer: false,
        titleMenuOpen: 'Navigation öffnen',
        titleMenuClose: 'Navigation schließen',
        titleHome: 'Zur Startseite',
        titleDarkTheme: 'Dunklen Modus wählen',
        titleLightTheme: 'Hellen Modus wählen',
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