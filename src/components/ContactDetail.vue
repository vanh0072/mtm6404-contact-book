<!-- src/components/ContactDetail.vue -->
<template>
    <div v-if="contact">
      <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
      <p>Email: {{ contact.email }}</p>
      <router-link :to="'/edit/' + contact.id">Edit</router-link>
      <button @click="deleteContact">Delete</button>
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
      const contact = ref(null);
      const route = useRoute();
      const router = useRouter();
  
      onMounted(async () => {
        const docRef = doc(db, 'contacts', route.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          contact.value = docSnap.data();
        }
      });
  
      const deleteContact = async () => {
        const docRef = doc(db, 'contacts', route.params.id);
        await deleteDoc(docRef);
        router.push('/');
      };
  
      return { contact, deleteContact };
    },
  };
  </script>
  