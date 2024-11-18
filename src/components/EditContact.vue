<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Edit Contact</h1>
    <form @submit.prevent="updateContact">
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
      <button type="submit" class="btn btn-warning w-100">Update Contact</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../db';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

export default {
  name: 'EditContact',
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const route = useRoute();
    const contactId = route.params.id;

    onMounted(async () => {
      const docRef = doc(db, 'contacts', contactId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const contact = docSnap.data();
        firstName.value = contact.firstName;
        lastName.value = contact.lastName;
        email.value = contact.email;
      }
    });

    const updateContact = async () => {
      const docRef = doc(db, 'contacts', contactId);
      await updateDoc(docRef, {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      });
      alert('Contact updated!');
    };

    return { firstName, lastName, email, updateContact };
  }
};
</script>

<style scoped>
/* You can add custom styles if necessary */
</style>
