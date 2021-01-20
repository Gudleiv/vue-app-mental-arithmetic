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
    categories: [
      {
        id: '1',
        name: 'Cat 1',
        exercises: []
      },
      {
        id: '2',
        name: 'Category 2',
        exercises: [
          new Exercise('101', '10,-5,13,12', true),
          new Exercise('103', '1,-1,3,4,-2', false)
        ]
      }
    ]
  },
  mutations: {
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
