import firebase from '@/firebase'

export default {
  state: {
    settings: {
      amountOfNumbers: 10,
      timeInterval: 1.5,
      digitNumber: 1,
      muteSound: false,
    },
    status: {
      onGame: false,
      onCountUp: false,
      onCountDown: false,
      onFinish: false,
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
    },
    SET_SETTING_MUTESOUND(state, payload) {
      state.settings.muteSound = payload
    },
    SET_STATUS_ONGAME(state, payload) {
      state.status.onGame = payload
    },
    SET_STATUS_ONCOUNTUP(state, payload) {
      state.status.onCountUp = payload
    },
    SET_STATUS_ONCOUNTDOWN(state, payload) {
      state.status.onCountDown = payload
    },
    SET_STATUS_ONFINISH(state, payload) {
      state.status.onFinish = payload
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
      if (has('muteSound', payload)) {
        commit('SET_SETTING_DNUMBER', payload.muteSound)
      }
    },
    setGameStatus({commit, getters}, p) {
      const s = getters.getGameStatus
      if (changes('onGame', p, s)) commit('SET_STATUS_ONGAME', p.onGame)
      if (changes('onCountUp', p, s)) commit('SET_STATUS_ONCOUNTUP', p.onCountUp)
      if (changes('onCountDown', p, s)) commit('SET_STATUS_ONCOUNTDOWN', p.onCountDown)
      if (changes('onFinish', p, s)) commit('SET_STATUS_ONFINISH', p.onFinish)
    }
  },
  getters: {
    getGameSettings(state) {
      return state.settings
    },
    getGameStatus(state) {
      return state.status
    }
  }
}

function has(prop, obj) {
  if (!obj.hasOwnProperty(prop)) return false
  if (typeof obj[prop] === 'boolean') return true
  if (obj[prop]) return true
  return false
}

// = if payload has new data
function changes(prop, newObj, oldObj) {
  if (!newObj.hasOwnProperty(prop) && !oldObj.hasOwnProperty(prop)) return false
  return newObj[prop] !== oldObj[prop];
}
