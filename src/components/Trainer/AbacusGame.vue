<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto">
        <AbacusGameOutput
            @end="finish"
            v-show="gameOn"
            ref="output"
            :numbers="nums"
        />
      </div>
      <div class="col-lg-8 col-md-10 mx-auto">
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

export default {
  name: 'AbacusGame',
  components: {
    AbacusGameSettings,
    AbacusGameOutput,
  },
  data() {
    return {
      nums: [1, 2],
      gameOn: false,
    }
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
