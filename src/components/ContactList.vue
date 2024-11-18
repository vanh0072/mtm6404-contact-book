<!-- src/components/ContactList.vue -->
<template>
    <div>
      <input v-model="search" placeholder="Search contacts..." />
      <ul>
        <li v-for="contact in filteredContacts" :key="contact.id">
          <router-link :to="'/contact/' + contact.id">
            {{ contact.firstName }} {{ contact.lastName }}
          </router-link>
        </li>
      </ul>
      <router-link to="/add">Add New Contact</router-link>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { db } from '../db';
  import { collection, getDocs, query, orderBy } from 'firebase/firestore';
  
  export default {
    name: 'ContactList',
    setup() {
      const contacts = ref([]);
      const search = ref('');
  
      onMounted(async () => {
        const q = query(collection(db, 'contacts'), orderBy('lastName'));
        const querySnapshot = await getDocs(q);
        contacts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
  
      const filteredContacts = computed(() => {
        return contacts.value.filter(contact =>
          contact.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(search.value.toLowerCase())
        );
      });
  
      return { contacts, search, filteredContacts };
    },
  };
  </script>
  