// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import ContactList from './components/ContactList.vue';
import ContactDetail from './components/ContactDetail.vue';
import AddContact from './components/AddContact.vue';
import EditContact from './components/EditContact.vue';

const routes = [
  { path: '/', component: ContactList },
  { path: '/contact/:id', component: ContactDetail },
  { path: '/add', component: AddContact },
  { path: '/edit/:id', component: EditContact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;