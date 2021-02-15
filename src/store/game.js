import firebase from '@/firebase'

const DEF = {
  GAMETYPES: {
    default: 'default',
    column: 'column',
  },
  GAMESTATUS: {
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
  amountOfNumbers: 'amountOfNumbers',
  timeInterval: 'timeInterval',
  digitNumber: 'digitNumber',
  muteSound: 'muteSound',
  volume: 'volume',
  categoryId: 'categoryId',
  exerciseId: 'exerciseId',
}

export default {
  state: {
    settings: {
      amountOfNumbers: 6,
      timeInterval: 1.7,
      digitNumber: 1,
      muteSound: false,
      volume: 0.75,
      categoryId: null,
      exerciseId: null,
    },
    gameStatus: 0,
    gameType: DEF.GAMETYPES.default,
  },
  mutations: {
    SET_SETTING_AMOUNTOFNUMBERS(state, payload) {
      state.settings.amountOfNumbers = payload
    },
    SET_SETTING_TIMEINTERVAL(state, payload) {
      state.settings.timeInterval = payload
    },
    SET_SETTING_DIGITNUMBERS(state, payload) {
      state.settings.digitNumbers = payload
    },
    SET_SETTING_MUTESOUND(state, payload) {
      state.settings.muteSound = payload
    },
    SET_SETTING_VOLUME(state, payload) {
      state.settings.volume = payload
    },
    SET_SETTING_CATEGORYID(state, payload) {
      state.settings.categoryId = payload
    },
    SET_SETTING_EXERCISEID(state, payload) {
      state.settings.exerciseId = payload
    },
    SET_GAME_STATUS(state, payload) {
      state.gameStatus = payload
    },
    SET_GAME_TYPE(state, payload) {
      state.gameType = payload
    },
  },
  actions: {
    fetchGameSettings({
      commit,
      dispatch,
    }) {
      const settings = JSON.parse(localStorage.getItem('gameSettings'))
      if (settings && Object.keys(settings).length) {
/*        if (
          has(DEF.amountOfNumbers, settings)
          && settings.amountOfNumbers < 1
          || settings.amountOfNumbers > 100
        ) {
          return
        }
        if (
          has(DEF.timeInterval, settings)
          && settings.timeInterval < 0.5
          || settings.timeInterval > 10
        ) {
          return
        }
        if (
          has(DEF.digitNumber, settings)
          && settings.digitNumber < 1
          || settings.digitNumber > 5
        ) {
          return
        }*/
        dispatch('updateGameSettings', settings)
      }
    },
    updateGameSettings({ commit }, payload) {
      const settings = JSON.parse(localStorage.getItem('gameSettings'))
      if (settings) {
        // Дополнить существующие настройки
        localStorage.setItem('gameSettings',
          JSON.stringify(Object.assign(settings, payload)))
      } else {
        // Создать новые настройки
        localStorage.setItem('gameSettings', JSON.stringify(payload))
      }

      if (has(DEF.amountOfNumbers, payload)) {
        commit('SET_SETTING_AMOUNTOFNUMBERS', payload.amountOfNumbers)
      }
      if (has(DEF.timeInterval, payload)) {
        commit('SET_SETTING_TIMEINTERVAL', payload.timeInterval)
      }
      if (has(DEF.digitNumber, payload)) {
        commit('SET_SETTING_DIGITNUMBERS', payload.digitNumber)
      }
      if (has(DEF.muteSound, payload)) {
        commit('SET_SETTING_MUTESOUND', payload.muteSound)
      }
      if (has(DEF.volume, payload)) {
        commit('SET_SETTING_VOLUME', payload.muteSound)
      }
      if (has(DEF.categoryId, payload)) {
        commit('SET_SETTING_CATEGORYID', payload.categoryId)
      }
      if (has(DEF.exerciseId, payload)) {
        commit('SET_SETTING_EXERCISEID', payload.exerciseId)
      }
    },
    setGameStatus({ commit }, payload) {
      commit('SET_GAME_STATUS', payload)
    },
    setGameType({ commit }, payload) {
      commit('SET_GAME_TYPE', payload)
    },
  },
  getters: {
    getGameSettings(state) {
      return state.settings
    },
    getGameSetting(state) {
      return name => {
        if (state.settings.hasOwnProperty(name)) {
          return state.settings[name]
        } else {
          throw new Error(`Property ${name} in state.settings not found`)
        }
      }
    },
    getGameStatus(state) {
      return state.gameStatus
    },
    getGameType(state) {
      return state.gameType
    },
  },
}

function has(prop, obj) {
  if (!obj.hasOwnProperty(prop)) return false
  if (typeof obj[prop] === 'boolean') return true
  return !!obj[prop]
}

// = if payload has new data
function changes(prop, newObj, oldObj) {
  if (!newObj.hasOwnProperty(prop) && !oldObj.hasOwnProperty(prop)) return false
  return newObj[prop] !== oldObj[prop];
}
