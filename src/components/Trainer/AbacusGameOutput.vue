<template>
  <div class="col-lg-6 col-md-8 mx-auto">
    <svg
        style="overflow:visible"
        v-show="gameOn"
        viewBox="0 0 100 100">
<!--      <line x1="46" y1="64" x2="53" y2="64" style="stroke:rgba(128,128,128,.3);stroke-width:1" />-->
      <line x1="44" y1="63" x2="55" y2="63" style="stroke:rgba(128,128,128,.2);stroke-width:1" />
      <text
          class="output-text"
          x="43%"
          y="50%"
          text-anchor="end"
          dy=".3em"
      >{{ aboveZero ? '+' : '-'}}</text>
        <transition name="fade">
          <text
              class="output-text text"
              :key="numberKey"
              x="43%"
              y="50%"
              text-anchor="start"
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
  fill: #333;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.6rem;
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
