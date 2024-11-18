<template>
  <div id="app">
    <Navbar />
    <router-view />  <!-- This will display the current page -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';  // Import Navbar only once

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style scoped>
/* Optional global styles if needed */
</style>
