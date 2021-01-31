<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <abacus-game-settings
          v-show="!gameOn"
        ></abacus-game-settings>
        <abacus-game-output
            @end="finish"
            v-show="gameOn"
            ref="output"
            :numbers="nums"
        ></abacus-game-output>
        <b-button
            v-show="!gameOn"
            variant="primary"
            class="mr-1"
            @click="start"
        >Старт</b-button>
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
    AbacusGameOutput
  },
  data() {
    return {
      nums: [123,234,-432,-123,321],
      gameOn: false
    }
  },
  methods: {
    start() {
      this.gameOn = true
      this.$refs.output.start()
    },
    finish() {
      this.gameOn = false
    }
  },
}
</script>

<style scoped>

</style>
