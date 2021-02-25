import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import firebase from '@/firebase'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'
import Profile from '@/components/Profile/Profile'
import Abacus from '@/components/Trainer/Abacus'
import AbacusGame from '@/components/Trainer/AbacusGame'
import AbacusExercises from '@/components/Trainer/AbacusExercises'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      skipForUsers(next, 'Abacus')
    }
  },
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter(to, from, next) {
      skipForUsers(next)
    }
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: SignUp,
    beforeEnter(to, from, next) {
      skipForUsers(next)
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    redirect: '/abacus/game',
    path: '/abacus',
    name: 'Abacus',
    component: Abacus,
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: 'game',
        name: 'AbacusGame',
        component: AbacusGame,
      },
      {
        path: 'exercises',
        name: 'AbacusExercises',
        component: AbacusExercises,
        meta: {
          requiresAuth: true
        },
      },
    ]
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

async function skipForUsers(next, to = 'Home') {
  const user = await getUserState()
  if (user !== null) {
    next({ name: to })
  } else {
    next()
  }
}

function getUserState () {
  return new Promise((resolve, reject) => {
    if (store.state.user.user === undefined) {
      const unwatch = store.watch(
        () => store.state.user.user,
        (value) => {
          unwatch()
          resolve(value)
        }
      )
    } else {
      resolve(store.state.user.user)
    }
  })
}

export default router;
