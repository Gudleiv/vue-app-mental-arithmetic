import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import firebase from '@/firebase'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'
import Abacus from '@/components/Trainer/Abacus'

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
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresNoAuth: true
    }
  },
  {
    path: '/train/abacus',
    name: 'Abacus',
    component: Abacus,
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// Router guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !await firebase.getCurrentUser()) {
    next({ name: 'SignIn', query: {required: true} });
  } else {
    next();
  }
})

//
router.beforeEach(async (to, from, next) => {
  const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth)
  if (requiresNoAuth && store.getters.user !== null) {
    next({ name: 'Home' });
  } else {
    next();
  }
})
export default router;
