import firebase from '@/firebase'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    clearUser(state) {
      state.user = null
    }
  },
  actions: {
    async loginUser({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async registerUser ({commit}, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    logoutUser({commit}) {
      firebase.auth().signOut()
      commit('clearUser')
    },
    autoLoginUser({commit}, user) {
      commit('setUser', new User(user.uid))
    },
    loginRequired({commit}, message) {
      commit('clearError')
      commit('setError', message)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
