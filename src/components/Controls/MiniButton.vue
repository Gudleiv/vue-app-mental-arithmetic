<template>
  <b-button
      :class="['button', { 'button-text': hasText}]"
      :style="{ 'flexDirection': leftText ? 'row-reverse' : 'row'}"
      size="sm"
      pill
      v-on="$listeners"
      v-bind="$attrs"
  >
    <b-icon :icon="icon" :class="{ 'icon-text': hasText}"></b-icon>
    <slot></slot>
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
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasText() {
      return this.$slots.default
    },
    leftText() {
      return this.hasText && this.reverse
    }
  },
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
  padding: 0 0.5rem;
  width: auto;
}

.icon-text {
}
</style>
