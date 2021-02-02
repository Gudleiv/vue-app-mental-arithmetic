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
            @end="finish"
            v-show="gameOn"
            ref="output"
            :numbers="nums"
            :delay="timeInterval"
        />
        <AbacusGameSettings
            v-show="!gameOn"
        />
        <div class="d-flex justify-content-end">
          <b-button
              v-show="!gameOn"
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
      nums: [1],
      gameOn: false,
    }
  },
  computed: {
    settings() {
      return this.$store.getters.getGameSettings
    },
    timeInterval() {
      return this.settings.timeInterval * 1000
    },

  },
  methods: {
    start() {
      this.gameOn = true
      this.$refs.output.start()
    },
    finish() {
      this.gameOn = false
    },
  },
}
</script>

<style scoped>

</style>
