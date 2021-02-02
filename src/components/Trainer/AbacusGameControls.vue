<template>
  <div class="abacus-game-controls">
    <mini-button v-if="status === 40" icon="grip-vertical" text="Столбиком" variant="primary"></mini-button>
    <mini-button @click="restartGame" v-if="status >= 10" icon="arrow-clockwise" variant="outline-primary"></mini-button>
    <mini-button @click="muteSound" v-if="true" :icon="mute ? 'volume-mute' : 'volume-up-fill'" :variant="mute ? 'outline-secondary' : 'primary'"></mini-button>
    <mini-button @click="cancelGame" v-if="status !== 0" icon="x" variant="outline-danger"></mini-button>

  </div>
</template>

<script>
import MiniButton from '@/components/Controls/MiniButton'

export default {
  name: 'AbacusGameControls',
  components: {
    MiniButton
  },
  computed: {
    status() {
      return this.$store.getters.getGameStatus
    },
    settings() {
      return this.$store.getters.getGameSettings
    },
    mute() {
      return this.$store.getters.getGameSetting('muteSound')
    },
  },
  methods: {
    restartGame() {

    },
    muteSound() {
      this.$store.dispatch('updateGameSettings', { muteSound: !this.mute})
    },
    cancelGame() {

    },
  }
}
</script>

<style scoped>
.abacus-game-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.abacus-game-controls > button:not(:last-child) {
  margin-bottom: 6px;
  margin-right: 8px
}
</style>
