<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Add New Contact</h1>
    <form @submit.prevent="addContact">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input v-model="firstName" id="firstName" type="text" class="form-control" placeholder="First Name" required />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input v-model="lastName" id="lastName" type="text" class="form-control" placeholder="Last Name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="email" id="email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <button type="submit" class="btn btn-success w-100">Add Contact</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../db';
import { collection, addDoc } from 'firebase/firestore';

export default {
  name: 'AddContact',
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');

    // Function to add a new contact to Firestore
    const addContact = async () => {
      try {
        // Create a new document in Firestore under 'contacts' collection
        await addDoc(collection(db, 'contacts'), {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
        });
        // Reset form fields after successful addition
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        alert('Contact added successfully!');
      } catch (error) {
        console.error('Error adding contact: ', error);
        alert('Error adding contact');
      }
    };

    return { firstName, lastName, email, addContact };
  }
};

const addContact = async () => {
  try {
    console.log("Adding contact:", firstName.value, lastName.value, email.value); // Debugging
    await addDoc(collection(db, 'contacts'), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    });
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    alert('Contact added!');
  } catch (error) {
    console.error('Error adding contact:', error);
    alert('Error adding contact');
  }
};

</script>

<style scoped>
/* Optional styling for the form */
.container {
  max-width: 600px;
  margin: auto;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
