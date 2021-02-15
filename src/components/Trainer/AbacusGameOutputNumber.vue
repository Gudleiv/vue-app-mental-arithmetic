<template>
  <svg
      style="overflow:visible"
      viewBox="0 0 100 100">
    <line x1="44" y1="63" x2="55" y2="63" style="stroke:rgba(128,128,128,.2);stroke-width:1"/>
    <text
        class="output-text"
        x="43%"
        y="50%"
        text-anchor="end"
        dy=".3em"
    >{{ aboveZero ? '' : '-' }}
    </text>
    <transition name="fade">
      <text
          class="output-text text"
          :key="numberKey"
          x="43%"
          y="50%"
          text-anchor="start"
          dy=".3em"
      >{{ number }}
      </text>
    </transition>
  </svg>
</template>

<script>
export default {
  name: 'AbacusGameOutputNumber',
  props: ['number', 'numberKey'],
  data() {
    return {
      aboveZero: this.number > 0
    }
  },
  watch: {
    number(nV, oV) {
      this.aboveZero = nV > 0
    }
  }
}
</script>

<style>
</style>