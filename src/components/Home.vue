<template>
  <div class="home">
    <h1>Welcome to your Contact Book</h1>
    <h2>Easily find contacts, add new ones or edit existing contact cards.</h2>
    <p>MTM6404 Web Applications</p>
    <p>Coded by: Tessa van Haastrecht</p>
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
  color: #3c763d;
}

h2, h3 {
  color: #3c763d;
  font-weight: 600;
  padding: 20px;
}

p {
  margin: 20px;
}

</style>
