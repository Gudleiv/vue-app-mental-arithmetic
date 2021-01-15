import firebase from '@/firebase'

class User {
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }
}

export default {
  state: {
    user: undefined
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
        commit('setUser', new User(user.uid, user.displayName, user.email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    async registerUser ({commit}, { email, password, name }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
        await user.updateProfile({
          displayName: name
        })
        commit('setUser', new User(user.uid, user.displayName, user.email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    async updateUserInfo ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = firebase.auth().currentUser
        const newInfo = {
          displayName: payload.name || user.displayName,
        }
        await user.updateProfile(newInfo)
        commit('setUser', new User(user.uid, user.displayName, user.email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    async updateEmail ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = firebase.auth().currentUser
        await user.updateEmail(payload.email)
        commit('setUser', new User(user.uid, user.displayName, user.email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    async updatePassword ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = firebase.auth().currentUser
        await user.updatePassword(payload.password)
        commit('setUser', new User(user.uid, user.displayName, user.email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    logoutUser({commit}) {
      firebase.auth().signOut().then(() => {
        commit('clearUser')
      })
    },
    autoLoginUser({commit}, user) {
      commit('setUser', new User(user.uid, user.displayName, user.email))
    },
    prepareLogin({commit}) {
      commit('setUser', null)
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
      return state.user != null
    }
  }
}
