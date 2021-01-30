<template>
  <div class="container">
    <div class="row">
    <h2>Game</h2>
    </div>
    <div class="row">
      <div class="col">
        <b-button variant="primary" class="mr-1" @click="start">Start</b-button>
        <abacus-game-settings></abacus-game-settings>
        <abacus-game-output
            ref="output"
            :numbers="nums"
        ></abacus-game-output>
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
      nums: [123,234,-432,-123,321]
    }
  },
  methods: {
    start() {
      this.$refs.output.start()
    }
  },
}
</script>

<style scoped>

</style>
