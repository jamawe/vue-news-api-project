<template>
  <v-app>

    <v-main class="pt-2">
      <!-- Use unique on router-view to force vue to create a new component instance -->
      <router-view :key="$route.fullPath"></router-view>

    </v-main>

    <BackToTopButton v-show="scrollYPosition > scrollThreshold" />
    
    <AppNavbar/>
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import BackToTopButton from './components/BackToTopButton.vue';

export default {

  name: 'App',

  components: {
    AppNavbar,
    BackToTopButton,
  },

  data() {
    return {
      scrollThreshold: 100,
      scrollYPosition: 0,
    }
  },

  created() {
    const isDark = JSON.parse(localStorage.getItem('nap-dark'));
    this.$vuetify.theme.dark = isDark;
    window.addEventListener('scroll', () => {
      this.scrollYPosition = window.scrollY;
    });
  },
  
};
</script>


<style lang="scss">
  html {
    width: 100%;
    height: 100vh;
  }

  .bg-lighter {
    background-color: var(--v-menuFooter-base);
  }

  .line-behind {
    padding: 0 10px;
    box-shadow: inset 0 -10px 0 0 var(--v-backdrop-base);
    /* box-shadow: inset 0 -10px 0 0 #B2DFDB; */
  }

  .height-whole {
    height: 100%;
  }

  .width-whole {
    width: 100%;
  }

  .keep-all {
    word-break: keep-all;
  }

  .ch70 {
    max-width: 70ch;
  }

  .font-sm {
    font-size: 1.125rem;
  }

  .font-md {
    font-size: 1.25rem; // 20px
  }

  .font-lg {
    font-size: 1.5rem; // 24px
  }

  .font-xxl {
    font-size: 4rem; // 64px
  }

  .tracking-normal {
    letter-spacing: normal;
  }

  .tracking-wider {
    letter-spacing: .0625rem; // 1px
  }

  .tracking-wide {
    letter-spacing: .125rem; // 2px
  }

  .monospace {
    font-family: 'Courier New', Courier, monospace;
  }

  .sans {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  .serif {
    font-family: Georgia, Times, 'Times New Roman', serif;
  }

  .pointer {
    cursor: pointer;
  }

  main {
    max-width: 70ch;
  }
</style>