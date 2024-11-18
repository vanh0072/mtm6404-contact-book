<template>
  <div class="contact-detail container my-5">
    <Navbar />
    <div class="contact-card p-4 shadow rounded">
      <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <div class="btn-container mt-4">
        <router-link :to="'/edit/' + contact.id" class="btn btn-warning">Edit Contact</router-link>
        <button @click="deleteContact" class="btn btn-danger ml-2">Delete Contact</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { db } from '../db';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'ContactDetail',
  setup() {
    const contact = ref({});
    const route = useRoute();
    const router = useRouter();
    const contactId = route.params.id;

    onMounted(async () => {
      const docRef = doc(db, 'contacts', contactId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        contact.value = docSnap.data();
        contact.value.id = docSnap.id;
      }
    });

    const deleteContact = async () => {
      await deleteDoc(doc(db, 'contacts', contactId));
      alert('Contact deleted!');
      router.push('/contact-list');
    };

    return { contact, deleteContact };
  }
};
</script>

<style scoped>
.contact-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.contact-card {
  background-color: #f1f8e9; /* Light sage background */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-card h1 {
  color: #3c763d; /* Sage green */
  font-size: 2rem;
  margin-bottom: 20px;
}

.contact-card p {
  font-size: 1.2rem;
  color: #333;
}

.contact-card .btn-container {
  display: flex;
  justify-content: space-between;
}

.contact-card .btn {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.contact-card .btn-warning {
  background-color: #ffc107;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.contact-card .btn-warning:hover {
  background-color: #e0a800;
}

.contact-card .btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.contact-card .btn-danger:hover {
  background-color: #c82333;
}

</style>
