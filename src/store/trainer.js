import firebase from '@/firebase'

export default {
  state: {
    settings: {
      amountOfNumbers: 6,
      timeInterval: 1.7,
      digitNumber: 1,
      muteSound: false,
      categoryId: null,
      exerciseId: null
    },
    status: 0
    /*
    * >1 - on game
    * 10 - on count up spinner
    * 11 - on count down spinner
    * 20 - on restart
    * 22 - on cancel
    * 30 - on output
    * 40 - on answer form
    */
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
    },
    SET_SETTING_MUTESOUND(state, payload) {
      state.settings.muteSound = payload
    },
    SET_SETTING_CATID(state, payload) {
      state.settings.categoryId = payload
    },
    SET_SETTING_EXID(state, payload) {
      state.settings.exerciseId = payload
    },
    SET_STATUS_GAME(state, payload) {
      state.status = payload
    },
  },
  actions: {
    fetchGameSettings({commit, dispatch}) {
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
        dispatch('updateGameSettings', settings)
      }
    },
    updateGameSettings({commit}, payload) {
      const settings = JSON.parse(localStorage.getItem('settings'))
      localStorage.setItem('settings', JSON.stringify(Object.assign(settings, payload)))

      if (has('amountOfNumbers', payload)) {
        commit('SET_SETTING_AMOUNTNUMS', payload.amountOfNumbers)
      }
      if (has('timeInterval', payload)) {
        commit('SET_SETTING_INTERVAL', payload.timeInterval)
      }
      if (has('digitNumber', payload)) {
        commit('SET_SETTING_DNUMBER', payload.digitNumber)
      }
      if (has('muteSound', payload)) {
        commit('SET_SETTING_MUTESOUND', payload.muteSound)
      }
      if (has('categoryId', payload)) {
        commit('SET_SETTING_CATID', payload.categoryId)
      }
      if (has('exerciseId', payload)) {
        commit('SET_SETTING_EXID', payload.exerciseId)
      }
    },
    setGameStatus({commit}, payload) {
      commit('SET_STATUS_GAME', payload)
    }
  },
  getters: {
    getGameSettings(state) {
      return state.settings
    },
    getGameSetting(state) {
      return name => {
        if (state.settings.hasOwnProperty(name)) return state.settings[name]
        else throw new Error(`Property ${name} in state.settings not found`)
      }
    },
    getGameStatus(state) {
      return state.status
    }
  }
}

function has(prop, obj) {
  if (!obj.hasOwnProperty(prop)) return false
  if (typeof obj[prop] === 'boolean') return true
  return !!obj[prop];
}

// = if payload has new data
function changes(prop, newObj, oldObj) {
  if (!newObj.hasOwnProperty(prop) && !oldObj.hasOwnProperty(prop)) return false
  return newObj[prop] !== oldObj[prop];
}
