<template>
  <v-app>

    <v-main>
      <!-- Use unique on router-view to force vue to create a new component instance -->
      <router-view :key="$route.fullPath"></router-view>
      <!-- <router-view ></router-view> -->


    </v-main>
    
    <AppNavbar/>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },

  data() {
    return {

    }
  },
};
</script>


<style>
  .line-behind {
      padding: 0 10px;
      box-shadow: inset 0 -10px 0 0 #B2DFDB;
  }

  html {
    width: 100%;
    height: 100vh;
  }

/* WEG 2 */
  /* :root {
    --background-color: red;
    --text-color: black;
  } */

  /* [data-theme="darkTheme"] {
    --background-color: black;
    --text-color: white;
  } */

</style>