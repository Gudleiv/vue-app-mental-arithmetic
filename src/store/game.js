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
      state.settings.timeInterval = parseFloat(payload)
    },
    SET_SETTING_DIGITNUMBERS(state, payload) {
      state.settings.digitNumbers = payload
    },
    SET_SETTING_MUTESOUND(state, payload) {
      state.settings.muteSound = payload
    },
    SET_SETTING_VOLUME(state, payload) {
      state.settings.volume = parseFloat(payload)
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

      if (payload.hasOwnProperty(DEF.amountOfNumbers)) {
        commit('SET_SETTING_AMOUNTOFNUMBERS', payload.amountOfNumbers)
      }
      if (payload.hasOwnProperty(DEF.timeInterval)) {
        commit('SET_SETTING_TIMEINTERVAL', payload.timeInterval)
      }
      if (payload.hasOwnProperty(DEF.digitNumber)) {
        commit('SET_SETTING_DIGITNUMBERS', payload.digitNumber)
      }
      if (payload.hasOwnProperty(DEF.muteSound)) {
        commit('SET_SETTING_MUTESOUND', payload.muteSound)
      }
      if (payload.hasOwnProperty(DEF.volume)) {
        commit('SET_SETTING_VOLUME', payload.volume)
      }
      if (payload.hasOwnProperty(DEF.categoryId)) {
        commit('SET_SETTING_CATEGORYID', payload.categoryId)
      }
      if (payload.hasOwnProperty(DEF.exerciseId)) {
        commit('SET_SETTING_EXERCISEID', payload.exerciseId)
      }
    },

    updateVolume({
      getters,
      dispatch,
    }, payload) {
      if (!payload) {
        // Шаговое изменеие громкости
        const volume = getters.getGameSetting(DEF.volume)
        console.log('get vol', volume)
        let newVolume = 0
        if (volume === 0) {
          newVolume = 0.25
        } else if (volume === 0.25) {
          newVolume = 0.5
        } else if (volume === 0.5) {
          newVolume = 0.75
        } else if (volume === 0.75) {
          newVolume = 1
        } else {
          newVolume = 0
        }
        dispatch('updateGameSettings', { volume: newVolume })
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

// = if payload has new data
function changes(prop, newObj, oldObj) {
  if (!newObj.hasOwnProperty(prop) && !oldObj.hasOwnProperty(prop)) return false
  return newObj[prop] !== oldObj[prop];
}
