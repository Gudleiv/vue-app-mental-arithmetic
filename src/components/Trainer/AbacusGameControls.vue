<template>
  <div class="abacus-game-controls">
    <mini-button @click="restartGameWithNewType('column')" v-if="gameType !== 'column' & status === 40" icon="arrow-clockwise" text="Столбиком" variant="primary"></mini-button>
    <mini-button @click="restartGameWithNewType('default')" v-if="gameType !== 'default' & status === 40" icon="arrow-clockwise" text="Форсаж" variant="primary"></mini-button>
    <mini-button @click="restartGame" v-if="status > 0" :disabled="status <= 20" icon="arrow-clockwise" variant="outline-primary"></mini-button>
<!--    <mini-button @click="toggleSound" v-if="true" :icon="mute ? 'volume-mute' : 'volume-up-fill'" :variant="mute ? 'outline-secondary' : 'primary'"></mini-button>-->
    <mini-button
        @click="volumeStep"
        v-b-tooltip.hover.bottom :title="`Громкость: ${volume*100}% `"
        v-if="true"
        :icon="mute ? 'volume-mute' : 'volume-up-fill'"
        :variant="mute ? 'outline-secondary' : 'primary'"
        :fill="10 - (volume * 10)"
    ></mini-button>
    <mini-button
        @click="cancelGame"
        :disabled="status <= 10"
        icon="x"
        variant="outline-danger"
    ></mini-button>

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
    volume() {
      return this.$store.getters.getGameSetting('volume')
    },
  },
  methods: {
    restartGame() {
      this.$store.dispatch('setGameStatus', 20)
    },
    restartGameWithNewType(gameType) {
      this.$store.dispatch('setGameType', gameType)
      this.$store.dispatch('setGameStatus', 20)
    },
    cancelGame() {
      this.$store.dispatch('setGameStatus', 22)
    },
    toggleSound() {
      this.$store.dispatch('updateGameSettings', { muteSound: !this.mute})
    },
    volumeStep() {
      this.$store.dispatch('updateVolume')
    },
  }
}
</script>

<style>
.abacus-game-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
  background-color: white;
  border: 1px solid rgba(128,128,128,0.2);
  border-radius: 32px;
  padding: 6px;
  transition: all 0.4s ease;
}

.abacus-game-controls-fixed {
  position: fixed;
  top: 1%;
  right: 1%;
}

.abacus-game-controls > button:not(:last-child) {
  margin-right: 8px
}
</style>
