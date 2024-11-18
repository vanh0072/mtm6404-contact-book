import { createRouter, createWebHistory } from 'vue-router';
import Home from './App.vue';
import AddContact from './components/AddContact.vue';
import ContactList from './components/ContactList.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AddContact },
  { path: '/contact-list', component: ContactList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
