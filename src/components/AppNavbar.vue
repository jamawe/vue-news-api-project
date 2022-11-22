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
        :title="titleMenuOpen"
        class="text--primary">
      </v-app-bar-nav-icon>

      <v-btn 
        icon
        @click.stop="search = !search"
        class="text--primary"
        :title="titleSearchOpen">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

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

      <v-btn icon @click="toggleTheme">
        <v-icon v-if="!$vuetify.theme.dark" :title="titleDarkTheme" color="indigo lighten-2">mdi-moon-waxing-crescent</v-icon>
        <v-icon v-else :title="titleLightTheme" color="amber lighten-3">mdi-white-balance-sunny</v-icon>
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
                      <v-btn @click="drawer=false" text exact :to="{ name: `${category.toRouteName}`, params: { category: category.params.category, isSection: category.params.isSection }}" :title="`Open ${category.name}`">{{ category.name }}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon
            color="#BDBDBD"
            @click="drawer=false"
            :title="titleMenuClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="search"
      max-width="500">

      <v-card
        class="mx-auto">
        <v-card-title class="d-flex justify-center serif font-md tracking-wider text-capitalize font-weight-bold font-italic text--primary py-6">
          Keyword search
        </v-card-title>
        <v-card-text class="py-6">
            <v-text-field
              prepend-icon="mdi-magnify"
              single-line
              color="accent"
              placeholder="Enter your keyword(s)"
              :error="hasError"
              :error-messages="errors"
              id="search"
              @change="removeErrorState"
              v-model.trim="keyword"
              :title="titleSearchKeyword"
            ></v-text-field>
        </v-card-text>

        <v-card-text class="py-6">
            <v-autocomplete
              v-model="chosenNewsDesks"
              :items="newsDesks"
              outlined
              deletable-chips
              small-chips
              chips
              color="accent"
              prepend-icon="mdi-filter-outline"
              label="Filter by news desk(s)"
              multiple
              item-color="accent"
              :title="titleSearchFilter"
            ></v-autocomplete>
        </v-card-text>

        <v-card-actions class="py-6">
            <v-spacer></v-spacer>
            <v-btn
                elevation="0"
                color="accent"
                :title="titleSearchStart"
                @click="startSearch">
                Go
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
  
</template>

<script>
  import { menu, newsDesks } from '../modules/menu.mjs';

  export default {

    data() {
      return {
        drawer: false,
        search: false,
        titleMenuOpen: 'Open Navigation',
        titleMenuClose: 'Close Navigation',
        titleSearchOpen: 'Open Search Dialog',
        titleSearchKeyword: 'Enter your keyword(s)',
        titleSearchFilter: 'Choose news desks to filter the results',
        titleSearchStart: 'Start Search',
        titleHome: 'Navigate Home',
        titleDarkTheme: 'Choose Dark Theme',
        titleLightTheme: 'Choose Light Theme',
        titleGithub: 'Open project on GitHub',
        menu,
        hasError: false,
        errors: [],
        keyword: '',
        newsDesks,
        chosenNewsDesks: [],
      }
    },

    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem('nap-dark', this.$vuetify.theme.dark);
      },

      startSearch() {
        this.removeErrorState();
        if (!this.keyword) {
            this.hasError = true;
            this.errors.push('Please enter a keyword.');
            return;
        }
        const keywordString = this.formatQueryString(this.keyword);
        
        this.$router.push({ name: 'SearchResultsPage', query: { q: keywordString, news_desk: this.chosenNewsDesks.join(',') } });

        this.search = false;
      },

      removeErrorState() {
        this.hasError = false;
        this.errors = [];
      },

      formatQueryString(value) {
        // Trim whitespace; replace invalid chars with +; replace whitespace whit +; replace ++ with +
        // 'term+term2'
        value = value.replace(/^\s+|\s+$/g, '').replace(/\s/g, '+').replace(/\++/g, '+');
        return value;
      },

      // formatNewsDeskString(newsDesksArray) {
      //   let newsDeskString = '';
      //   newsDesksArray.forEach(item => newsDeskString += `"${item}" `);
      //   return newsDeskString.trim();
      // }
    }
  }
</script>