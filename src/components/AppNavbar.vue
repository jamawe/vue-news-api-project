<template>

  <div class="nav-container">
    <v-app-bar
    app
    dense
    bottom
    color="white"
    flat
    elevate-on-scroll
    >
    
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

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

    <v-dialog
      v-model="drawer"
      width="500"
    >

      <v-card
        tile
      >
        <v-card-title class="d-flex justify-center text-h6 mb-0"><span class="drawer-title">Wofür interessierst du dich?</span>
        </v-card-title>


        <v-card-text>
          <v-list class="text-center">
            <v-list-item-group>

              <v-list-item v-for="(category, i) in categories" :key="i" @click="drawer=false">
                <v-list-item-title>
                  <router-link
                    :to="`/${category}`"
                    class="black--text text-decoration-none"
                    
                  >
                    <span class="drawer-link line-behind">{{ category }}</span>
                  </router-link>
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
  export default {

    data() {
      return {
        drawer: false,
        theme: '',
        categories: [
          'business','entertainment','general','health','science','sports','technology'
        ],
      }
    },

  }
</script>

<style scoped>

  .drawer-title {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    word-break: keep-all;
    text-align: center;
  }

  .home-link, .drawer-link {
    font-family: 'Courier New', Courier, monospace;
  }
  
</style>