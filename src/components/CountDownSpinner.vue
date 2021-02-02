<template>
  <svg
      viewBox="0 0 100 100"
  >
    <defs>
      <linearGradient id="test">
        <stop offset="0%" stop-color="#145A32"/>
        <stop offset="100%" stop-color="#0E6655"/>
      </linearGradient>
    </defs>
    <circle
        v-if="showSpin"
        ref="circle"
        :stroke-dasharray="length"
        :stroke-dashoffset="offset"
        class="circle__animation circle"
        :style="{ animationDuration,
                    animationName,
                  }"
        stroke="url(#test)"
        stroke-width="4"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
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
      >{{ counter - 1 }}
      </text>
    </transition>
  </svg>
</template>

<script>
export default {
  name: 'CountDownSpinner',
  props: {
    counts: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      showSpin: false,
      showText: false,
      timeout: null,
      counter: this.counts,
      length: 252, // best circumference of svg-circle with r = 40
      offset: 0,
      delay: 1000,
      animationName: this.countsAnimationName,
      animationDuration: this.countsAnimationDuration,
    }
  },
  computed: {
    countsAnimationName: {
      get: function () {
        return 'circleCountDown-' + this.counts
      },
      set: function (newValue) {
        this.animationName = newValue
      },
    },
    countsAnimationDuration: {
      get: function () {
        return this.counts * this.delay + 'ms'
      },
      set: function (newValue) {
        this.animationDuration = newValue + 'ms'
      },
    },
    time() {
      return this.counts
    },
  },
  methods: {
    start() {
      this.clear()
      return new Promise((resolve) => {
        this.$nextTick(() => {
          this.animationName = this.countsAnimationName
          this.animationDuration = this.countsAnimationDuration
          this.showSpin = true
          this.showText = true
          this.countDown()
              .then(() => {
                this.clear()
                resolve()
              })
        })
      })
    },

    clear() {
      clearTimeout(this.timeout)
      this.showSpin = false
      this.showText = false
      this.timeout = null
      this.counter = this.counts
    },

    countDown() {
      const eachDelay = this.delay
      const lastDelay = eachDelay / 2
      return new Promise((resolve) => {
        const countDown = () => {
          clearTimeout(this.timeout)
          const delay = this.counter > 1 ? eachDelay : lastDelay
          this.timeout = setTimeout(() => {
            if (this.counter === 1) this.showText = false
            this.counter--
            this.counter >= 0 ? countDown() : resolve()
          }, delay)
        }
        countDown()
      })
    },

    prepare(delay = 1000) {
      this.clear()
      this.showSpin = true
      this.countsAnimationName = 'circleCountUp'
      this.countsAnimationDuration = delay
      return new Promise((resolve) => {
        setTimeout(() => {
          this.animationName = this.countsAnimationName
          this.animationDuration = this.countsAnimationDuration
          this.showSpin = false
          resolve()
        }, delay)
      })
    }
  },
  beforeDestroy() {
    this.clear()
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
  fill: #333;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.6rem;
}

.circle__animation {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.fade-leave-active {
  opacity: 1;
  transition: all .2s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: all .2s ease-in;
}

.fade-enter {
  opacity: 0;
}

</style>

<style>

@keyframes circleCountUp {
  from {
    stroke-dashoffset: 252;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes circleCountDown-2 {
  50% {
    stroke-dashoffset: 126;
  }
  75% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 252;
    opacity: 0.1;
  }
}

@keyframes circleCountDown-3 {
  33% {
    stroke-dashoffset: 84;
  }
  67% {
    stroke-dashoffset: 168;
  }
  85% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 252;
    opacity: 0;
  }
}

</style>
