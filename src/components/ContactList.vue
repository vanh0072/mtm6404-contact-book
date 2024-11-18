<template>
  <div>
    <h1>Contact List</h1>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        {{ contact.firstName }} {{ contact.lastName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'; // Import both ref and onMounted

import { db } from '../db'; // Firebase database import
import { collection, getDocs, query, orderBy } from 'firebase/firestore'; // Firestore methods

export default {
  name: 'ContactList',
  setup() {
    const contacts = ref([]); // Create a reactive reference to store contacts
    const search = ref(''); // Create a reactive reference for the search term

    // Fetch contacts from Firestore when the component is mounted
    onMounted(async () => {
      const q = query(collection(db, 'contacts'), orderBy('lastName'));
      const querySnapshot = await getDocs(q);
      contacts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });

    // Computed property to filter contacts based on the search query
    const filteredContacts = computed(() => {
      return contacts.value.filter(contact =>
        contact.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    return { search, filteredContacts };
  }
};
</script>

<style scoped>
/* Add styles here */
</style>
