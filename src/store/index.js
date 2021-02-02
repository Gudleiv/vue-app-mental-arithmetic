import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import exercises from './exercises'
import trainer from './trainer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    shared,
    exercises,
    trainer
  },
});
