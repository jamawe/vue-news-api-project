<template>
  <!-- <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      bottom
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-moon-waxing-crescent</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;">
      </v-container>
    </v-sheet>
  </v-card> -->

  <div class="nav-container">
    <v-app-bar
    app
    dense
    bottom
    color="white"
    flat
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
    >
    
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/" class="black--text text-decoration-none">
        <span class="home-link line-behind">home</span>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->

    <!-- <v-btn icon @click="toggleTheme" aria-label="Toggle themes"> -->
    <v-btn icon>
      <v-icon>mdi-moon-waxing-crescent</v-icon>
    </v-btn>
    
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-7"
      max-height="600"
    >
      <v-container style="height: 1500px;">
      </v-container>
    </v-sheet>

    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
      >
      
      <v-list>
        <v-list-item-group>
          <!-- Todo: So kann man verlinken: <v-list-item router to="/category"> -->

          <v-list-item v-for="(category, i) in categories" :key="i">
            <v-list-item-title>
              <router-link
                :to="`/${category}`"
                class="black--text text-capitalize text-decoration-none"
              >
                <span class="drawer-link line-behind">{{ category }}</span>
              </router-link>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>

      </v-list>

      <!-- Todo: Button which closes nav drawer? -->
      <!-- <div>
        <button flat @click.stop="drawer = !drawer">close</button>
      </div> -->

    </v-navigation-drawer>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        theme: '',
        categories: [
          'business','entertainment','general','health','science','sports','technology'
        ],
        // {
        //     'business': 'business','entertainment': 'unterhaltung','general': 'allgemein','health': 'gesundheit','science': 'wissenschaft','sports': 'sport','technology': 'technologie'
        //     }
      }
    },
    // WEG 1
    // mounted() {
    //   const theme = localStorage.getItem('theme');
    //   if (theme) {
    //     if (theme == "true") {
    //       this.$vuetify.theme.dark = true;
    //     } else {
    //       this.$vuetify.theme.dark = false;
    //     }
    //   }
    // },
    // methods: {
    //   toggleTheme() {
    //     this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    //     localStorage.setItem('theme', this.$vuetify.theme.dark.toString());
    //   }
    // }

    // WEG 2
    // mounted() {
    //   let localTheme = localStorage.getItem('theme'); // Get stored theme value
    //   document.documentElement.setAttribute('data-theme', localTheme); // Update data-theme attribute
    // },
    // methods: {
    //   toggleTheme() {
    //     // eslint-disable-next-line
    //     console.log(this.theme);
    //     this.theme = this.theme == 'darkTheme' ? '' : 'darkTheme'; // Toggle theme value
    //     document.documentElement.setAttribute('data-theme', this.theme); // Set data-theme attribute to current theme
    //     localStorage.setItem('theme', this.theme); // Store theme value in local storage
    //     // eslint-disable-next-line
    //     console.log(localStorage);
    //   }
    // }
  }
</script>

<style scoped>
  /* .nav-container {
    z-index: 100;
  } */

  .home-link, .drawer-link {
    font-family: 'Courier New', Courier, monospace;
  }
</style>