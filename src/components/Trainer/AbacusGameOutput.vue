<template>
  <div class="col-lg-6 col-md-8 mx-auto">
    <div class="d-flex">
      <div class="ml-auto">
        <b-button :disabled="!gameOn" @click="restart" class="button-controls" size="sm" pill variant="outline-primary"><b-icon icon="arrow-clockwise"></b-icon></b-button>
        <b-button disabled class="button-controls" size="sm" pill variant="outline-primary"><b-icon icon="volume-down"></b-icon></b-button>
        <b-button @click="cancel" class="button-controls" size="sm" pill variant="outline-secondary"><b-icon icon="x"></b-icon></b-button>
      </div>
    </div>
    <svg
        style="overflow:visible"
        v-show="gameOn"
        viewBox="0 0 100 100">
      <line x1="44" y1="63" x2="55" y2="63" style="stroke:rgba(128,128,128,.2);stroke-width:1" />
      <text
          class="output-text"
          x="43%"
          y="50%"
          text-anchor="end"
          dy=".3em"
      >{{ aboveZero ? '' : '-'}}</text>
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
        :counts="3"
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
    async start(startToBeginTime = 500) {
      this.clear()
      await this.$refs.countdown.startToBegin(startToBeginTime)
      await this.$refs.countdown.start()
      await this.drawGame()
      this.gameOn = false
      this.$emit('end')
    },
    clear() {
      this.gameOn = false
      clearTimeout(this.timeout)
      this.timeout = null
      this.number = null
    },
    cancel() {
      this.clear()
      this.$emit('end')
    },
    async restart(){
      await this.start(900)
    }
  }
}
</script>

<style scoped>
.button-controls {
  padding: 0;
  width: 36px;
  height: 36px;
  margin-left: 8px;
}

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
