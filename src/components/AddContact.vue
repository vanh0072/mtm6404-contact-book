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
import { db } from '../db';  // Make sure db.js is correctly set up
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
      console.log('Add contact method triggered'); // Add this line to check if the method is being called
      try {
        await addDoc(collection(db, 'contacts'), { 
          firstName: firstName.value, 
          lastName: lastName.value, 
          email: email.value 
        });
        console.log('Contact added successfully');
        router.push('/');  // Redirect to the homepage after adding the contact
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    };

    return { firstName, lastName, email, addContact };
  }
};
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
