<template>
  <div>
    <svg
        viewBox="0 0 100 60"
    >
      <circle
          v-if="show"
          id="circle"
          ref="circle"
          :stroke-dasharray="length"
          :stroke-dashoffset="offset"
          :class="{ 'circle__animation': show }"
          :style="{ animationDuration: time + 's',  }"
          stroke="#542532"
          stroke-width="4"
          fill="transparent"
          r="25"
          cx="50"
          cy="30"
      />
    </svg>
  </div>
</template>

<script>
function findKeyframesRule(rule) {
  const ss = document.styleSheets;
  for (let i = 0; i < ss.length; ++i) {
    for (let j = 0; j < ss[i].cssRules.length; ++j) {
      if (ss[i].cssRules[j].name == rule) {
        return ss[i].cssRules[j]
      }
    }
  }
  return null;
}

export default {
  name: 'CountDownSpinner',
  props: {
    time: {
      type: Number,
      default: 3
    },
  },
  data() {
    return {
      show: true,
      length: 158, // best circumference of svg-circle
      offset: 0
    }
  },
  methods: {
    start() {
      this.show = true
    },
    stop() {
      this.show = false
    },
    restart() {
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>
svg {

}

circle {
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transform: rotate(-90deg);
}

.circle__animation {
  animation-name: circlecountdownanimation;
  animation-iteration-count: initial;
  animation-fill-mode: both;
}

@keyframes circlecountdownanimation {
  33% {
    stroke-dashoffset: 50;
  }

  67% {
    stroke-dashoffset: 100;
  }

  92% {
    stroke-dashoffset: 158;
    transform: rotate(-90deg);
    opacity: 1;
  }

  99% {
    stroke-dashoffset: 0;
    transform: rotate(-270deg);
    opacity: 0.1;
  }
  100% {
    opacity: 0
  }
}

</style>
