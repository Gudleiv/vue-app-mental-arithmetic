<template>
  <div class="abacus-game-controls">
    <mini-button @click="restartGameType('column')" v-if="gameType !== 'column' & status === 40" icon="grip-vertical" text="Столбиком" variant="primary"></mini-button>
    <mini-button @click="restartGameType('default')" v-if="gameType !== 'default' & status === 40" icon="fullscreen-exit" text="Форсаж" variant="primary"></mini-button>
    <mini-button @click="restartGame" v-if="status > 0" :disabled="status < 20" icon="arrow-clockwise" variant="outline-primary"></mini-button>
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
    gameType() {
      return this.$store.getters.getGameType
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
      this.$store.dispatch('setGameStatus', 20)
    },
    restartGameType(gameType) {
      this.$store.dispatch('setGameType', gameType)
      this.$store.dispatch('setGameStatus', 20)
    },
    cancelGame() {
      this.$store.dispatch('setGameStatus', 22)
    },
    muteSound() {
      this.$store.dispatch('updateGameSettings', { muteSound: !this.mute})
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
