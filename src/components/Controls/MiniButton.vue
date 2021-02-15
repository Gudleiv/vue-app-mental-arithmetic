<template>
  <b-button
      :class="['button', { 'button-text': text}]"
      :style="{ 'flexDirection': !reverse ? 'row-reverse' : 'row'}"
      size="sm"
      pill
      v-on="$listeners"
      v-bind="$attrs"
  >{{ text }}
    <b-icon :icon="icon" :class="{ 'icon-text': text}"></b-icon>
  </b-button>
</template>

<script>
export default {
  name: 'MiniButton',
  props: {
    icon: {
      type: String,
      default: 'circle',
    },
    text: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
}

.button-text {
  padding: 0 0.5rem 2px;
  width: auto;
}

.icon-text {
  margin: 0 4px;
}
</style>
