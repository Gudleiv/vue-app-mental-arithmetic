import fb from '@/firebase/database'
import Vue from 'vue'

class Exercise {
  constructor(exercise, id = null, enabled = true) {
    this.id = id
    this.data = exercise
    this.enabled = enabled
  }
}

class Category {
  constructor(name, id = null) {
    this.id = id
    this.name = name
    this.exercises = []
  }

  addExercise(data) {
    this.exercises.push(data)
  }
}

export default {
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    addCategory(state, category) {
      state.categories.push(category)
    },
    editCategory(
      state, {
        id,
        name,
      }) {
      const category = state.categories.find(c => c.id === id)
      category.name = name
    },
    deleteCategory(state, id) {
      const catId = state.categories.findIndex(c => c.id === id)
      state.categories.splice(catId, 1)
    },
    addExercise(state, {
      catId,
      exercise,
    }) {
      const category = state.categories.find(cat => cat.id === catId)
      category.exercises.push(exercise)
    },
    switchExercise(
      state, {
        id,
        catId,
        enabled,
      }) {
      const category = state.categories.find(cat => cat.id === catId)
      const exercise = category.exercises.find(ex => ex.id === id)
      exercise.enabled = enabled
    },
    updateExercise(state, { catId, exercise }) {
      const category = state.categories.find(cat => cat.id === catId)
      const currentExercise = category.exercises.find(ex => ex.id === exercise.id)
      if (exercise.hasOwnProperty('data')) currentExercise.data = exercise.data
      if (exercise.hasOwnProperty('enabled')) currentExercise.enabled = exercise.enabled
    },
    deleteExercise(
      state, {
        catId,
        id,
      }) {
      const category = state.categories.find(cat => cat.id === catId)
      const exercise = category.exercises.findIndex(ex => ex.id === id)
      category.exercises.splice(exercise, 1)
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      const categories = await fb.getCategories()
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
      const result = []
      Object.keys(categories)
        .forEach(key => {
          const c = categories[key]
          const category = new Category(c.name, key)
          if (c.exercises) {
            Object.keys(c.exercises)
              .forEach(eKey => {
                const e = c.exercises[eKey]
                const exercise = new Exercise(e.data, eKey, e.enabled)
                category.addExercise(exercise)
              })
          }
          result.push(category)
        })
      commit('setCategories', result)
    },

    addCategory({ commit }, payload) {
      commit('clearError')
      const category = new Category(payload)
      fb.addCategory(category)
        .then(key => {
          category.id = key
          commit('addCategory', category)
        })
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
    },

    editCategory({ commit }, payload) {
      commit('clearError')
      fb.updateCategory(payload.id, payload.name)
        .then(() => {
          commit('editCategory', payload)
        })
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
    },
    deleteCategory({ commit }, payload) {
      commit('clearError')
      fb.removeCategory(payload)
        .then(() => {
          commit('deleteCategory', payload)
        })
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
    },
    addExercise({ commit }, {catId, data}) {
      commit('clearError')
      const exercise = new Exercise(data)
      fb.addExercise(catId, exercise)
        .then(key => {
          exercise.id = key
          commit('addExercise', {
            catId,
            exercise,
          })
        })
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
    },
    updateExercise({ commit }, { catId, exercise }) {
      commit('clearError')
      fb.updateExercise(catId, exercise)
        .then(() => {
          commit('updateExercise', { catId, exercise })
        })
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
    },
    deleteExercise({ commit }, { catId, id }) {
      commit('clearError')
      fb.removeExercise(catId, id)
        .then(() => {
          commit('deleteExercise', { catId, id })
        })
        .catch((error) => {
          commit('setError', error.message)
          throw error
        })
    },
  },
  getters: {
    categoriesList(state) {
      if (!state.categories.length) return []
      return state.categories.map(c => ({
        id: c.id,
        name: c.name,
      }))
    },
    categoriesListWithExercises(state) {
      if (!state.categories.length) null
      const list = state.categories
        .filter(c => c.exercises.some(ex => ex.enabled))
        .filter(c => c.exercises.length)
        .map(c => ({
        id: c.id,
        name: c.name,
      }))
      if (list.length) return list
      else return null
    },
    categories(state) {
      if (!state.categories.length) return []
      return state.categories
    },
    category(state, getters) {
      return id => {
        if (!getters.categories.length) return null
        const cat = getters.categories.find(c => c.id === id)
        return cat
      }
    },
    exercises(state) {
      return catId => {
        const category = state.categories.find(cat => cat.id === catId)
        if (!category || !category.exercises) return []
        return category.exercises
      }
    },
    enabledExercises(state) {
      return catId => {
        const category = state.categories
          .find(cat => cat.id === catId)
          .exercises.filter(ex => ex.enabled)
        if (!category.length) return []
        return category
      }
    },
    getExercise(state) {
      return (catId, exId) => {
        const category = state.categories.find(cat => cat.id === catId)
        const exercise = category.exercises.find(ex => ex.id === exId)
        return exercise.data.split(',').map(e => parseInt(e))
      }
    }
  },
}
