import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
