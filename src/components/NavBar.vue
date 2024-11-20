<template>
  <nav class="navbar">
    <div class="navbar-content">
      <router-link to="/" class="navbar-item">Home</router-link>
      <router-link to="/add-contact" class="navbar-item">Add Contact</router-link>
      <router-link to="/contact-list" class="navbar-item">Contact List</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: #4CAF50;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  gap: 20px;
}

.navbar-item {
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s;
}

.navbar-item:hover {
  color: #f1f1f1;
}
</style>
