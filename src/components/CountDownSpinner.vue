<template>
    <svg
        viewBox="0 0 100 60"
    >
      <defs>
        <linearGradient id="test">
          <stop offset="0%" stop-color="#145A32"/>
          <stop offset="100%" stop-color="#0E6655"/>
        </linearGradient>
      </defs>
      <circle
          v-if="show"
          ref="circle"
          :stroke-dasharray="length"
          :stroke-dashoffset="offset"
          class="circle__animation circle"
          :style="{ animationDuration: animationDuration,
                    animationName: animationName
                  }"
          stroke="url(#test)"
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
      >{{counter - 1}}</text>
      </transition>
    </svg>
</template>

<script>
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
      timeout: null,
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
      this.stop()
      this.$nextTick(() => {
        this.init()
      })
    },

    asyncStart() {
      return new Promise((resolve) => {
        this.stop()
        this.$nextTick(() => {
          this.show = true
          this.showText = true
          this.countDown().then(() => {
            this.stop()
            resolve()
          })
        })
      })
    },

    stop() {
      clearTimeout(this.timeout)
      this.timeout = null
      this.counter = this.counts
      this.show = false
      this.showText = false
    },

    init() {
      this.show = true
      this.showText = true
      this.countDown().then(() => {
        this.$emit('end')
        this.stop()
      })
    },

    countDown() {
      const eachDelay = 1000
      const lastDelay = 500
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
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.7rem;
}

.circle__animation {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.fade-leave-active {
  opacity: 1;
  transition: all .25s ease-out;
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
  100% {
    stroke-dashoffset: 158;
    opacity: 0.1;
  }
}

@keyframes circleCountDown-3 {
  33% {
    stroke-dashoffset: 52;
  }
  67% {
    stroke-dashoffset: 106;
  }
  85% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 158;
    opacity: 0;
  }
}

</style>
