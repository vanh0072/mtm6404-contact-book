<template>
  <div class="add-contact">
    <h2>Add New Contact</h2>
    <form @submit.prevent="addContact">
      <input v-model="firstName" type="text" placeholder="First Name" required />
      <input v-model="lastName" type="text" placeholder="Last Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Add Contact</button>
    </form>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { db } from '../db';
import { collection, addDoc } from 'firebase/firestore';

export default {
  name: 'AddContact',
  components: {
    Navbar,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  },
  methods: {
    async addContact() {
      try {
        await addDoc(collection(db, 'contacts'), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        });
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        
        this.$router.push('/contact-list');
      } catch (e) {
        console.error("Error adding contact: ", e);
      }
    },
  },
};
</script>

<style scoped>
.add-contact {
  background-color: #f1f8e9;
  padding: 50px;
  border-radius: 10px;
  max-width: 500px;
  margin: 20px auto;
}

.add-contact h2 {
  color: #3c763d;
  margin-bottom: 20px;
  margin-top: 20px;
}

.add-contact input {
  width: 100%;
  padding: 12px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.add-contact button {
  width: 100%;
  padding: 12px;
  margin: 10px;
  background-color: #3c763d;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-contact button:hover {
  background-color: #2e5a2f;
}

.add-contact {
  margin-top: 50px;
}
</style>

