<template>
  <div>
    <div class="d-flex">
      <div class="ml-auto">
        <b-button :disabled="h.disableButtons" @click="restart" class="button-controls" size="sm" pill variant="outline-primary">
          <b-icon icon="arrow-clockwise"></b-icon>
        </b-button>
        <b-button disabled class="button-controls" size="sm" pill variant="outline-primary">
          <b-icon icon="volume-down"></b-icon>
        </b-button>
        <b-button @click="cancel" class="button-controls" size="sm" pill variant="outline-danger">
          <b-icon icon="x"></b-icon>
        </b-button>
      </div>
    </div>
    <svg
        style="overflow:visible"
        v-show="status.onGame && !status.onCountDown"
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
    <count-down-spinner
        v-show="status.onCountDown"
        ref="countdown"
        :counts="3"
    ></count-down-spinner>
  </div>
</template>

<script>
import CountDownSpinner from '@/components/CountDownSpinner'

function playSound(num) {
  num = num > 0 ? '+' + String(num) : String(num)
  const sound = new Audio(`/sounds/ru/${num}.mp3`)
  console.dir(sound)
  sound.play()
}

export default {
  name: 'AbacusGameOutput',
  components: {
    CountDownSpinner,
  },
  props: {
    numbers: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    return {
      status: {
        onGame: false,
        onCountDown: false,
      },
      h: {
        timeout: null,
        disableButtons: false,
      },
      number: null,
      numberKey: 0,
      aboveZero: true,
      delay: 2000,
    }
  },
  methods: {
    drawGame() {
      const array = [...this.numbers]
      const delay = this.delay
      return new Promise((resolve) => {
        const next = () => {
          const num = array.shift()
          playSound(num)
          this.aboveZero = num > 0
          this.number = Math.abs(num)
          this.numberKey++
          clearTimeout(this.h.timeout)
          this.h.timeout = setTimeout(() => {
            array.length > 0 ? next() : resolve()
          }, delay)
        }
        next()
      })
    },
    async start(startToBeginTime = 500) {
      this.clear()
      const cd = this.$refs.countdown
      this.status.onGame = true
      this.status.onCountDown = true
      this.h.disableButtons = true
      this.status.onCountDown ? await cd.startToBegin(startToBeginTime) : cd.stop()
      this.h.disableButtons = false
      this.status.onCountDown ? await cd.start() : cd.stop()
      this.status.onCountDown = false
      if (this.status.onGame) await this.drawGame()
      this.clear()
    },
    clear() {
      clearTimeout(this.h.timeout)
      this.status.onGame = false
      this.status.onCountDown = false
      this.h.disableButtons = false
      this.h.timeout = null
      this.number = null
      this.numberKey = 0
    },
    cancel() {
      this.clear()
      this.$emit('end')
    },
    async restart() {
      await this.start(900)
    },
  },
}
</script>

<style scoped>
.button-controls {
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
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
