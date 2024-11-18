<script setup>
import AddContact from './components/AddContact.vue';
import ContactDetail from './components/ContactDetail.vue';
import ContactList from './components/ContactList.vue';
import EditContact from './components/EditContact.vue';
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
