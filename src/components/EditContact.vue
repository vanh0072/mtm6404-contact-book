<template>
  <div class="edit-contact">
    <NavBar />
    <h2>Edit Contact</h2>
    <form @submit.prevent="updateContact">
      <input v-model="contact.firstName" type="text" placeholder="First Name" required />
      <input v-model="contact.lastName" type="text" placeholder="Last Name" required />
      <input v-model="contact.email" type="email" placeholder="Email" required />
      <button type="submit">Update Contact</button>
    </form>
  </div>
</template>

<script>
import { db, doc, updateDoc } from '../db';
import NavBar from './Navbar.vue';

export default {
  props: ['id'],
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },
  async created() {
    const docRef = doc(db, "contacts", this.id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      this.contact = docSnap.data();
    } else {
      alert("Contact not found");
    }
  },
  methods: {
    async updateContact() {
      try {
        const docRef = doc(db, "contacts", this.id);
        await updateDoc(docRef, {
          firstName: this.contact.firstName,
          lastName: this.contact.lastName,
          email: this.contact.email,
        });
        alert('Contact updated successfully!');
        this.$router.push('/contact-list'); // Redirect to the contact list page
      } catch (e) {
        alert('Error updating contact: ' + e);
      }
    },
  },
};
</script>

<style scoped>
.edit-contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f1f8e9;
  border-radius: 10px;
}

.edit-contact h2 {
  color: #3c763d;
  margin-bottom: 20px;
}

.edit-contact input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.edit-contact button {
  width: 100%;
  padding: 12px;
  background-color: #3c763d;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-contact button:hover {
  background-color: #2e5a2f;
}
</style>
