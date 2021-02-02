<template>
  <div class="abacus-game-controls">
    <mini-button v-if="status.onFinish" icon="grip-vertical" text="Столбиком" variant="primary"></mini-button>
    <mini-button v-if="status.onGame" :disabled="status.onCountUp" icon="arrow-clockwise" variant="outline-primary"></mini-button>
    <mini-button :icon="settings.muteSound ? 'volume-mute' : 'volume-up-fill'" :variant="settings.muteSound ? 'outline-secondary' : 'primary'"></mini-button>
    <mini-button v-if="status.onGame" icon="x" variant="outline-danger"></mini-button>

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
    }
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
