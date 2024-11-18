<template>
  <div class="home">
    <h1>Welcome to the Contact Book</h1>
    <p>Easily find your contacts!</p>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 3rem;
  padding: 20px;
  color: #3c763d; /* Sage green */
}

h2, h3 {
  color: #3c763d;
  font-weight: 600;
}

</style>
