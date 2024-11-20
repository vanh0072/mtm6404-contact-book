<template>
  <div class="contact-list">
    <Navbar />
    <h2>Contact List</h2>
    <div v-if="contacts.length === 0">No contacts available.</div>
    <div v-for="contact in contacts" :key="contact.id" class="card">
      <div class="card-body">
        <router-link :to="'/contact/' + contact.id" class="contact-name">
          <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
        </router-link>
        <p>{{ contact.email }}</p>
        <div class="contact-actions">
          <router-link :to="'/edit-contact/' + contact.id" class="edit-btn">Edit</router-link>
          <button class="delete-btn" @click="deleteContact(contact.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { db, collection, getDocs, deleteDoc, doc } from '../db';

export default {
  data() {
    return {
      contacts: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredContacts() {
      let filtered = this.contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
      
      return filtered.sort((a, b) => {
        const lastNameA = a.lastName.toLowerCase();
        const lastNameB = b.lastName.toLowerCase();
        return lastNameA.localeCompare(lastNameB);
      });
    }
  },
  created() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    this.contacts = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const lastNameA = a.lastName.toLowerCase();
        const lastNameB = b.lastName.toLowerCase();
        return lastNameA < lastNameB ? -1 : lastNameA > lastNameB ? 1 : 0;
      });
    console.log(this.contacts);
  } catch (e) {
    alert('Error fetching contacts: ' + e);
  }
},
    async deleteContact(id) {
      try {
        await deleteDoc(doc(db, "contacts", id));
        this.fetchContacts();
      } catch (e) {
        alert('Error deleting contact: ' + e);
      }
    }
  },
};
</script>

<style scoped>
.contact-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.contact-name {
  color: #3c763d;
  text-decoration: none;
}

.contact-name:hover {
  text-decoration: underline;
}

h2 {
  text-align: center;
  color: #3c763d;
  font-size: 2rem;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.card {
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.card-body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: left;
  gap: 10px;
}

.contact-info h3 {
  color: #3c763d;
  font-size: 1.5rem;
  margin: 0 auto;
  gap: 10px;
}

.contact-info p {
  color: #6c757d;
  font-size: 1.5rem;
  gap: 10px;
}

.contact-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .contact-list {
    padding: 10px;
  }

  .card {
    padding: 15px;
    flex-direction: row;
  }

  .contact-actions {
    width: 100%;
    justify-content: space-around;
  }
}
</style>
