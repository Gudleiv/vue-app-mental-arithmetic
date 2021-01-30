<template>
  <div class="col-lg-6 col-md-8 mx-auto">
    <svg
        v-show="gameOn"
        viewBox="0 0 100 60">
      <text
          class="output-text"
          x="50%"
          y="50%"
          text-anchor="end"
          stroke-width="1px"
          dy=".3em"
      >{{ aboveZero ? '+' : '-'}}</text>
        <transition name="fade">
          <text
              class="output-text"
              :key="numberKey"
              x="50%"
              y="50%"
              text-anchor="start"
              stroke-width="1px"
              dy=".3em"
          >{{ number }}</text>
      </transition>
    </svg>
    <count-down-spinner
        v-show="!gameOn"
        ref="countdown"
        :counts="2"
    ></count-down-spinner>
  </div>
</template>

<script>
import CountDownSpinner from '@/components/CountDownSpinner'



export default {
  name: 'AbacusGameOutput',
  components: {
    CountDownSpinner,
  },
  props: {
    numbers: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      number: null,
      aboveZero: true,
      gameOn: false,
      delay: 2000,
      timeout: null,
      numberKey: 0
    }
  },
  methods: {
    drawGame() {
      this.gameOn = true
      const array = [...this.numbers]
      const delay = this.delay
      return new Promise((resolve) => {
        const next = () => {
          const num = array.shift()
          this.aboveZero = num > 0
          this.number = Math.abs(num)
          this.numberKey++
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            array.length > 0 ? next() : resolve()
          }, delay)
        }
        next()
      })
    },
    async start() {
      this.clear()
      await this.$refs.countdown.asyncStart()
      await this.drawGame()
      this.gameOn = false
    },
    clear() {
      this.gameOn = false
      clearTimeout(this.timeout)
      this.timeout = null
      this.number = null
    }
  }
}
</script>

<style scoped>

.output-text {
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 2rem;
}

.fade-enter-active {
  opacity: 1;
  transition: all .3s ease-out;
}

.fade-leave-active {
  opacity: 1;
  transition: all .05s ease-out;
}

.fade-enter {
  transform: translateY(0px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(0px);
  opacity: 0;
}



</style>
