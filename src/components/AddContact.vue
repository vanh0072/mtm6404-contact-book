<!-- src/components/AddContact.vue -->
<template>
    <form @submit.prevent="addContact">
      <input v-model="firstName" placeholder="First Name" />
      <input v-model="lastName" placeholder="Last Name" />
      <input v-model="email" placeholder="Email" />
      <button type="submit">Add Contact</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { db } from '../db';
  import { collection, addDoc } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddContact',
    setup() {
      const firstName = ref('');
      const lastName = ref('');
      const email = ref('');
      const router = useRouter();
  
      const addContact = async () => {
        await addDoc(collection(db, 'contacts'), { firstName: firstName.value, lastName: lastName.value, email: email.value });
        router.push('/');
      };
  
      return { firstName, lastName, email, addContact };
    },
  };
  </script>
  