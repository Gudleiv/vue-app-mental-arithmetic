import firebase from '@/firebase.js'

const addCategory = async category => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref('/users/' + user.uid + '/categories')
      .push(category)
    return db.key
  } catch (error) {
    throw error
  }
}

const getCategories = async () => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref(`/users/${user.uid}/categories`)
      .once('value')
    const categories = db.val() || []
    return categories
  } catch (error) {
    throw error
  }
}

const updateCategory = async (catId, name) => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref(`/users/${user.uid}/categories/`)
      .child(catId)
      .update({ name })
  } catch (error) {
    throw error
  }
}

const removeCategory = async catId => {
  try {
    const user = await firebase.getCurrentUser()
    await firebase.database()
      .ref(`/users/${user.uid}/categories/`)
      .child(catId)
      .remove()
  } catch (error) {
    throw error
  }
}

const addExercise = async (catId, exercise) => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref(`/users/${user.uid}/categories/${catId}/exercises/`)
      .push(exercise)
    return db.key
  } catch (error) {
    throw error
  }
}

const updateExercise = async (catId, exercise) => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref(`/users/${user.uid}/categories/${catId}/exercises/`)
      .child(exercise.id)
      .update(exercise)
  } catch (error) {
    throw error
  }
}

const removeExercise = async (catId, exerciseId) => {
  try {
    const user = await firebase.getCurrentUser()
    await firebase.database()
      .ref(`/users/${user.uid}/categories/${catId}/exercises/`)
      .child(exerciseId)
      .remove()
  } catch (error) {
    throw error
  }
}

const addDefaultExercises = async () => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref(`/users/001/categories/`)
      .once('value')
      .then(async (snapshot) => {
        const data = snapshot.val()
        const userData = await firebase.database()
          .ref(`/users/${user.uid}/categories/`)
          .once('value')
          .then((userSnapshot) => {
            return userSnapshot.val()
          })
        const newData = Object.assign(userData, user)
        await firebase.database()
          .ref(`/users/${user.uid}/`)
          .set({ 'categories': newData })
      })
  } catch (error) {
    throw error
  }
}

const resetExercises = async () => {
  try {
    const user = await firebase.getCurrentUser()
    const db = await firebase.database()
      .ref(`/users/${user.uid}/`)
      .child('categories')
      .remove()
  } catch (error) {
    throw error
  }
}

export default {
  addCategory,
  getCategories,
  updateCategory,
  removeCategory,
  addExercise,
  updateExercise,
  removeExercise,
  addDefaultExercises,
  resetExercises,
}
