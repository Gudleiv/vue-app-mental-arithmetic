import firebase from '@/firebase'

class Exercise {
  constructor(id, data, enabled = true) {
    this.id = id
    this.data = data
    this.enabled = enabled
  }
}

class Category {
  constructor(id, name) {
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
    categories: []
  },
  mutations: {
    addCategory(state, name) {
      state.categories.push(new Category(Date.now(), name))
    },
    addExercise(state, { catId, data }) {
      const category = state.categories.find(cat => cat.id === catId)
      category.exercises.push(new Exercise(Date.now(), data))
    },
    switchExercise(state, { catId, id, status }) {
      const category = state.categories.find(cat => cat.id === catId)
      const exercise = category.exercises.find(ex => ex.id === id)
      exercise.enabled = status
    },
    deleteExercise(state, { catId, id }) {
      const category = state.categories.find(cat => cat.id === catId)
      const exercise = category.exercises.findIndex(ex => ex.id === id)
      category.exercises.splice(exercise, 1)
    }
  },
  actions: {
    addCategory({commit}, payload) {
      commit('addCategory', payload)
    },
    addExercise({commit}, payload) {
      commit('addExercise', payload)
    },
    toggleExercise({commit}, payload) {
      commit('switchExercise', payload)
    },
    deleteExercise({commit}, payload) {
      commit('deleteExercise', payload)
    }
  },
  getters: {
    categories(state) {
      if (!state.categories.length) return null
      return state.categories.map(c => ({id: c.id, name: c.name}))
    },
    exercises(state) {
      return exId => {
        const category = state.categories.find(cat => cat.id === exId)
        return category.exercises
      }
    }
  }
}
