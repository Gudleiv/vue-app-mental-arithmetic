<template>
  <div>
    <slot></slot>
    <b-button class="button-controls" style="padding:0 1rem;width:auto" size="sm" pill
              variant="primary">
      <b-icon icon="grip-vertical"></b-icon>
      Привет
    </b-button>

    <b-button @click="mute = !mute" class="button-controls" size="sm" pill
              :variant="mute ? 'outline-secondary' : 'primary'">
      <b-icon :icon="mute ? 'volume-mute' : 'volume-up-fill'"></b-icon>
    </b-button>
  </div>
</template>

<script>
import MiniButton from '@/components/Controls/MiniButton'

export default {
  name: 'MiniButtonsControl',
  components: {
    MiniButton
  }
}
</script>

<style scoped>

</style>
