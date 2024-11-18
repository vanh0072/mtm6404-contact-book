<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <!-- Search Bar -->
    <div class="mb-6">
      <input 
        v-model="search" 
        type="text" 
        placeholder="Search contacts..." 
        class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Contact List -->
    <ul class="space-y-4">
      <li 
        v-for="contact in filteredContacts" 
        :key="contact.id" 
        class="p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <router-link 
          :to="'/contact/' + contact.id" 
          class="block text-xl font-semibold text-blue-600 hover:underline"
        >
          {{ contact.firstName }} {{ contact.lastName }}
        </router-link>
      </li>
    </ul>

    <!-- Add New Contact Button -->
    <router-link 
      to="/add" 
      class="mt-8 block text-center text-white bg-green-500 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
    >
      Add New Contact
    </router-link>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { db } from '../db';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default {
  name: 'ContactList',
  setup() {
    const contacts = ref([]);
    const search = ref('');

    // Fetch contacts from Firestore
    onMounted(async () => {
      const q = query(collection(db, 'contacts'), orderBy('lastName'));
      const querySnapshot = await getDocs(q);
      contacts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });

    // Filter contacts based on the search query
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
/* Basic styles for the Contact List component */
.container {
  background-color: #f9f9f9;
}

input {
  width: 100%;
}

button {
  cursor: pointer;
}
</style>
