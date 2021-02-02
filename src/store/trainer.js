import firebase from '@/firebase'

export default {
  state: {
    settings: {
      amountOfNumbers: 10,
      timeInterval: 1.5,
      digitNumber: 1,
    }
  },
  mutations: {
    SET_SETTING_AMOUNTNUMS(state, payload) {
      state.settings.amountOfNumbers = payload
    },
    SET_SETTING_INTERVAL(state, payload) {
      state.settings.timeInterval = payload
    },
    SET_SETTING_DNUMBER(state, payload) {
      state.settings.digitNumbers = payload
    }
  },
  actions: {
    fetchSettings({commit, dispatch}) {
      const settings = JSON.parse(localStorage.getItem('settings'))
      if (settings && Object.keys(settings).length) {
        if (
          has('amountOfNumbers', settings)
          && settings.amountOfNumbers < 1
          || settings.amountOfNumbers > 100
        ) return
        if (
          has('timeInterval', settings)
          && settings.timeInterval < 0.5
          || settings.timeInterval > 10
        ) return
        if (
          has('digitNumber', settings)
          && settings.digitNumber < 1
          || settings.digitNumber > 5
        ) return
        dispatch('updateSettings', settings)
      }
    },
    updateSettings({commit}, payload) {
      localStorage.setItem('settings', JSON.stringify(payload))

      if (has('amountOfNumbers', payload)) {
        commit('SET_SETTING_AMOUNTNUMS', payload.amountOfNumbers)
      }
      if (has('timeInterval', payload)) {
        commit('SET_SETTING_INTERVAL', payload.timeInterval)
      }
      if (has('digitNumber', payload)) {
        commit('SET_SETTING_DNUMBER', payload.digitNumber)
      }
    }
  },
  getters: {
    getSettings(state) {
      return state.settings
    }
  }
}

function has(prop, obj) {
  if (!obj.hasOwnProperty(prop)) return false
  if (typeof obj[prop] === 'boolean') return true
  if (obj[prop]) return true
  return false
}
