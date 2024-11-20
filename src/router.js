import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import AddContact from './components/AddContact.vue';
import ContactList from './components/ContactList.vue';
import EditContact from './components/EditContact.vue';
import ContactDetail from './components/ContactDetail.vue';  // Import the ContactDetail component


const routes = [
  { path: '/', component: Home },
  { path: '/add-contact', component: AddContact },
  { path: '/contact-list', component: ContactList },
  { path: '/edit-contact/:id', component: EditContact, props: true },
  { path: '/contact/:id', component: ContactDetail, props: true }, // Define the route for contact details
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
