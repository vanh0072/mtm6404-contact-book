<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Contact List</h1>
    <input
      v-model="search"
      class="form-control mb-3"
      type="text"
      placeholder="Search contacts..."
    />
    <div class="row">
      <div class="col-md-4 mb-3" v-for="contact in filteredContacts" :key="contact.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ contact.firstName }} {{ contact.lastName }}</h5>
            <p class="card-text">Email: {{ contact.email }}</p>
            <router-link :to="'/contact/' + contact.id" class="btn btn-primary btn-sm">View Details</router-link>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/add" class="btn btn-success mt-3 d-block w-100">Add New Contact</router-link>
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

    return { search, filteredContacts };
  }
};
</script>

<style scoped>
/* You can add custom styles if necessary */
</style>
