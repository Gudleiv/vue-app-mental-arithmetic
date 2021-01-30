<template>
  <div class="container">
    <div class="row">
    <h2>Game</h2>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto">
    <abacus-game-settings></abacus-game-settings>
      </div>
    </div>
  </div>
</template>

<script>
import AbacusGameSettings from './AbacusGameSettings'

export default {
  name: 'AbacusGame',
  components: {
    AbacusGameSettings
  },

}
</script>

<style scoped>

</style>
