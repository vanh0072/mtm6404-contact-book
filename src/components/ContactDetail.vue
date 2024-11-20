<template>
  <div class="contact-detail">
    <Navbar />
    <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <router-link :to="'/edit-contact/' + contact.id" class="btn btn-warning">Edit Contact</router-link>
    <button @click="deleteContact" class="btn btn-danger">Delete Contact</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../db';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

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
  padding: 30px;
  display: grid;
}

h1 {
  font-size: 2rem;
  color: #3c763d;
}

p {
  font-size: 1.2rem;
  color: #6c757d;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.btn-warning {
  background-color: #ffc107;
  color: white;
  border: none;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
