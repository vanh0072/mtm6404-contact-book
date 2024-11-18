<template>
  <div class="container my-5">
    <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <router-link :to="'/edit/' + contact.id" class="btn btn-warning">Edit Contact</router-link>
    <button @click="deleteContact" class="btn btn-danger">Delete Contact</button>
  </div>
</template>

<script>
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
      router.push('/');
    };

    return { contact, deleteContact };
  }
};
</script>

<style scoped>
/* You can add custom styles if necessary */
</style>
