<template>
  <div>
    <svg
        viewBox="0 0 100 60"
    >
      <circle
          v-if="show"
          ref="circle"
          :stroke-dasharray="length"
          :stroke-dashoffset="offset"
          class="circle__animation circle"
          :style="{ animationDuration: animationDuration,
                    animationName: animationName
                  }"
          stroke="#542532"
          stroke-width="3"
          fill="transparent"
          r="25"
          cx="50"
          cy="30"
      />
      <transition name="fade">
      <text
          class="circle-text"
          v-if="showText"
          x="50%"
          y="50%"
          text-anchor="middle"
          stroke-width="1px"
          dy=".3em"
      >{{counter}}</text>
<!--      <text x="50%" y="50%" text-anchor="end" stroke-width="1px" dy=".3em">+</text>-->
<!--      <text x="50%" y="50%" text-anchor="start" stroke-width="1px" dy=".3em">{{counter}}1</text>-->
      </transition>
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
    counts: {
      type: Number,
      default: 3
    },
  },
  data() {
    return {
      show: false,
      showText: false,
      interval: null,
      counter: this.counts,
      length: 158, // best circumference of svg-circle
      offset: 0
    }
  },
  computed: {
    animationName() {
      return 'circleCountDown-' + this.counts
    },
    animationDuration() {
      return this.counts * 1000 + 'ms'
    },
    time() {
      return this.counts
    }
  },
  methods: {
    start() {
      this.show = true
      this.showText = true

      if (this.interval) return
      const delay = 1000
      this.interval = setInterval(() => {
        if (this.counter > 1) {
          this.counter--
        } else {
          this.showText = false
        }
      }, delay)
      const intervalID = this.interval
      setTimeout(() => {
        if (this.interval === intervalID) {
          this.stop()
        }
      }, delay * this.counts)
    },
    countDown() {
      const delay = this.counter > 1 ? 1000 : 500
      const timeout = setTimeout(() => {
        this.counter--
        if (this.counter > 1) this.countDown()
      }, delay)
    },
    stop() {
      clearInterval(this.interval)
      this.interval = null
      this.show = false
      this.showText = false
      this.counter = this.counts
    },
    restart() {
      this.stop()
      this.$nextTick(() => {
        this.start()
      })
    }
  }
}
</script>

<style scoped>
.circle {
  stroke-linecap: round;
  transform-origin: 50% 50%;
  transform: rotate(-90deg);
}

.circle-text {
  font-family: monospace;
  font-size: 1.5rem;
}

.circle__animation {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.fade-enter-active {
  opacity: 1;
  transition: all .2s ease;
}
.fade-leave-active {
  opacity: 1;
  transition: all .2s ease-out;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

</style>

<style>
@keyframes circleCountDown-2 {
  50% {
    stroke-dashoffset: 77;
  }
  75% {
    opacity: 1;
  }
  92% {
    stroke-dashoffset: 158;
    transform: rotate(-90deg);
    opacity: 0.2;
  }
  99% {
    stroke-dashoffset: 0;
    transform: rotate(-270deg);
    opacity: 0;
  }
  100% {
    opacity: 0
  }
}

@keyframes circleCountDown-3 {
  33% {
    stroke-dashoffset: 52;
  }
  67% {
    stroke-dashoffset: 106;
    opacity: 1;
  }
  92% {
    stroke-dashoffset: 158;
    transform: rotate(-90deg);
    opacity: 0.2;
  }
  99% {
    stroke-dashoffset: 0;
    transform: rotate(-270deg);
    opacity: 0;
  }
  100% {
    opacity: 0
  }
}

</style>
