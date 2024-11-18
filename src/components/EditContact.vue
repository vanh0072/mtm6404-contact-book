<!-- src/components/EditContact.vue -->
import { useRoute, useRouter } from 'vue-router';

<template>
    <form @submit.prevent="updateContact">
      <input v-model="firstName" placeholder="First Name" />
      <input v-model="lastName" placeholder="Last Name" />
      <input v-model="email" placeholder="Email" />
      <button type="submit">Update Contact</button>
    </form>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db } from '../db';
  import { doc, getDoc, updateDoc } from 'firebase/firestore';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'EditContact',
    setup() {
      const firstName = ref('');
      const lastName = ref('');
      const email = ref('');
      const route = useRoute();
      const router = useRouter();
  
      onMounted(async () => {
        const docRef = doc(db, 'contacts', route.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          firstName.value = docSnap.data().firstName;
          lastName.value = docSnap.data().lastName;
          email.value = docSnap.data().email;
        }
      });
  
      const updateContact = async () => {
        const docRef = doc(db, 'contacts', route.params.id);
        await updateDoc(docRef, { firstName: firstName.value, lastName: lastName.value, email: email.value });
        router.push('/');
      };
  
      return { firstName, lastName, email, updateContact };
    },
  };
  </script>
  