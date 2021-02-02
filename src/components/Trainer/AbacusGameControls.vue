<template>
  <div class="abacus-game-controls">
    <mini-button icon="grip-vertical" variant="primary">Столбиком</mini-button>
    <mini-button icon="arrow-clockwise" variant="outline-primary"></mini-button>
    <mini-button :icon="mute ? 'volume-mute' : 'volume-up-fill'" :variant="mute ? 'outline-secondary' : 'primary'"></mini-button>
    <mini-button icon="x" variant="outline-danger"></mini-button>

  </div>
</template>

<script>
import MiniButton from '@/components/Controls/MiniButton'

export default {
  name: 'AbacusGameControls',
  components: {
    MiniButton
  },
  data() {
    return {
      mute: true
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
