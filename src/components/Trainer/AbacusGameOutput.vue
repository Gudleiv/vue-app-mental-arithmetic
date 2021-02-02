<template>
  <div class="col-lg-8 col-md-10 mx-auto">
    <div class="d-flex">
      <div class="ml-auto">
        <transition name="fade">
          <b-button v-show="status.onFinish" class="button-controls" style="padding:0 1rem;width:auto" size="sm" pill
                    variant="primary">
            <b-icon icon="grip-vertical"></b-icon> Столбиком
          </b-button>
        </transition>

        <b-button :disabled="h.disableButtons" @click="restart" class="button-controls" size="sm" pill
                  variant="outline-primary">
          <b-icon icon="arrow-clockwise"></b-icon>
        </b-button>
        <b-button @click="mute = !mute" class="button-controls" size="sm" pill
                  :variant="mute ? 'outline-secondary' : 'primary'">
          <b-icon :icon="mute ? 'volume-mute' : 'volume-up-fill'"></b-icon>
        </b-button>
        <b-button @click="end" class="button-controls" size="sm" pill variant="outline-danger">
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
        :counts="2"
    ></count-down-spinner>
    <div style="height:300px" class="d-flex align-items-center justify-content-center" v-if="status.onFinish">
      <div class="col-8">
        <AnswerForm
            :answer="answer"
            @end="end"
            ref="answer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CountDownSpinner from '@/components/CountDownSpinner'
import AnswerForm from '@/components/Trainer/AnswerForm'
import SoundNumbers from '@/services/sound'

function calcAnswer(numbers) {
  return numbers.reduce((acc, cv) => acc + cv, 0)
}

export default {
  name: 'AbacusGameOutput',
  components: {
    CountDownSpinner,
    AnswerForm,
  },
  props: {
    numbers: {
      type: Array,
      default: [],
      required: true,
    },
    delay: {
      type: Number,
      default: 1500
    },
  },
  data() {
    return {
      status: {
        onGame: false,
        onCountDown: false,
        onFinish: false,
      },
      h: {
        timeout: null,
        disableButtons: false,
      },
      answer: null,
      number: null,
      numberKey: 0,
      aboveZero: true,
      sounds: null,
      mute: false
    }
  },
  computed: {
  },
  methods: {
    drawGame() {
      const array = [...this.numbers]
      const delay = this.delay
      return new Promise((resolve) => {
        const next = () => {
          const num = array.shift()
          if (array.length) this.sounds.preLoadSound(array[0])
          if (!this.mute) this.sounds.playSound(num, 0.7)
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
      this.status.onGame = this.status.onCountDown = true
      this.answer = calcAnswer(this.numbers)
      this.sounds = new SoundNumbers(this.numbers, 'ru')
      this.h.disableButtons = true
      this.status.onCountDown ? await cd.startToBegin(startToBeginTime) : cd.stop()
      this.h.disableButtons = false
      this.status.onCountDown ? await cd.start() : cd.stop()
      this.status.onCountDown = false
      if (this.status.onGame) await this.drawGame()
      this.clear()
      this.status.onFinish = true
      this.$nextTick(() => this.$refs.answer.focus())
    },
    clear() {
      clearTimeout(this.h.timeout)
      this.status.onGame = false
      this.status.onCountDown = false
      this.status.onFinish = false
      this.h.disableButtons = false
      this.h.timeout = null
      this.number = null
      this.numberKey = 0
    },
    end() {
      this.clear()
      this.$emit('end')
    },
    async restart() {
      await this.start(900)
    },
  },
}
</script>

<style>
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
