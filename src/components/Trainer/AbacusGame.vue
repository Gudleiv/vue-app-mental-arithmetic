<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="d-flex">
          <div class="ml-auto mb-2">
            <AbacusGameControls/>
          </div>
        </div>
        <AbacusGameOutput
            v-if="status > 0"
            ref="output"
            :numbers="exercise"
            :delay="timeInterval"
            :lang="settings.language"
        />
        <AbacusGameSettings
            v-show="status === 0"
        />
          <div class="d-flex justify-content-end mt-5">
            <b-button
                v-show="status === 0"
                variant="outline-info"
                style="margin-right:12px"
                size="lg"
                @click="start('column')"
            >Столбиком
            </b-button>
            <b-button
                v-show="status === 0"
                variant="primary"
                style="width:8rem"
                size="lg"
                @click="start('default')"
            >Форсаж
            </b-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import AbacusGameSettings from './AbacusGameSettings'
import AbacusGameOutput from './AbacusGameOutput'
import AbacusGameControls from './AbacusGameControls'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
  name: 'AbacusGame',
  components: {
    AbacusGameSettings,
    AbacusGameOutput,
    AbacusGameControls,
  },
  data() {
    return {
      exercise: null,
    }
  },
  computed: {
    settings() {
      return this.$store.getters.getGameSettings
    },
    timeInterval() {
      return this.settings.timeInterval * 1000
    },
    status() {
      return this.$store.getters.getGameStatus
    },
  },
  methods: {
    start(gameType = 'default') {
      this.prepareGameArray()
          .then(() => {
            this.$store.dispatch('setGameType', gameType)
            this.$store.dispatch('setGameStatus', 1)
          })
          .then(() => {
            this.$refs.output.start()
          })
          .catch(() => {
            this.$store.dispatch('setError', 'Создайте упражнения')
          })
    },
    prepareGameArray() {
      return new Promise((resolve, reject) => {
        const exercises = this.$store.getters.enabledExercises(this.settings.categoryId)
        if (exercises.length === 0) reject()
        const randomExercise = getRandomInt(1, exercises.length) - 1
        this.$store.dispatch('updateGameSettings', {
          exerciseId: exercises[randomExercise].id,
        })
        const exercise = this.$store.getters.getExercise(this.settings.categoryId, exercises[randomExercise].id)
        this.exercise = exercise.slice(0, this.settings.amountOfNumbers)
        resolve()
      })
    },
  },
}
</script>

<style scoped>

</style>
