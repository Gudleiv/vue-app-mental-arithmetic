<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="d-flex">
          <div class="ml-auto mb-2">
            <AbacusGameControls />
          </div>
        </div>
        <AbacusGameOutput
            v-if="status > 0"
            ref="output"
            :numbers="nums"
            :delay="timeInterval"
        />
        <AbacusGameSettings
            v-show="status === 0"
        />
        <div>
          <div class="d-flex justify-content-end">
            <b-button
                v-show="status === 0"
                variant="primary"
                style="width:8rem"
                size="lg"
                @click="start"
            >Старт
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AbacusGameSettings from './AbacusGameSettings'
import AbacusGameOutput from './AbacusGameOutput'
import AbacusGameControls from './AbacusGameControls'

export default {
  name: 'AbacusGame',
  components: {
    AbacusGameSettings,
    AbacusGameOutput,
    AbacusGameControls,
  },
  data() {
    return {
      nums: [1,2],
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
    start() {
      this.$store.dispatch('setGameStatus', 1).then(() =>{
        this.$refs.output.start()
      })
    },
    prepareGameArray() {
      const exercises = this.$store.getters.exercises(this.settings.categoryId)
    }
  },
}
</script>

<style scoped>

</style>
