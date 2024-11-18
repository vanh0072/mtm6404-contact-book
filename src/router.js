import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import AddContact from './components/AddContact.vue';
import ContactList from './components/ContactList.vue';
import EditContact from './components/EditContact.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/add-contact', component: AddContact },
  { path: '/contact-list', component: ContactList },
  { path: '/edit-contact/:id', component: EditContact, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
