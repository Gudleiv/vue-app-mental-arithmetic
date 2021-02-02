<template>
  <div class="col-lg-8 col-md-10 mx-auto">
    <!--    <div class="d-flex">
          <div class="ml-auto">
            <transition name="fade">
              <b-button v-show="status.onFinish" class="button-controls" style="padding:0 1rem;width:auto" size="sm" pill
                        variant="primary">
                <b-icon icon="grip-vertical"></b-icon> Столбиком
              </b-button>
            </transition>

            <b-button :disabled="status.onCountUp" @click="restart" class="button-controls" size="sm" pill
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
        </div>-->
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
    <div style="height:300px" class="d-flex align-items-center justify-content-center" v-show="status.onFinish">
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
      default: 1500,
    },
    lang: {
      type: String,
      default: 'ru',
    },
  },
  data() {
    return {
      status: {
        onGame: false,
        onCountUp: false,
        onCountDown: false,
        onFinish: false,
      },
      timeout: null,
      answer: null,
      number: null,
      numberKey: 0,
      aboveZero: true,
      sounds: null,
    }
  },
  computed: {
    settings() {
      return this.$store.getters.getGameSettings
    },
  },
  watch: {
    status: {
      deep: true,
      handler() {
        this.$store.dispatch('setGameStatus', this.status)
      },
    },
  },
  methods: {
    drawGame() {
      const array = [...this.numbers]
      const delay = this.delay
      return new Promise((resolve) => {
        const next = () => {
          const num = array.shift()
          if (array.length) this.sounds.preLoadSound(array[0])
          if (!this.settings.muteSound) this.sounds.playSound(num, 0.7)
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
      const s = this.status
      const cd = this.$refs.countdown
      s.onGame = true
      s.onCountDown = true
      this.answer = calcAnswer(this.numbers)
      this.sounds = new SoundNumbers(this.numbers, this.lang)
      s.onCountUp = true
      s.onCountDown ? await cd.startToBegin(startToBeginTime) : cd.stop()
      s.onCountUp = false
      s.onCountDown ? await cd.start() : cd.stop()
      s.onCountDown = false
      if (s.onGame) await this.drawGame()
      this.clear()
      s.onFinish = true
      if (this.$refs.answer) this.$refs.answer.focus()
    },
    clear() {
      clearTimeout(this.timeout)
      this.status.onGame = false
      this.status.onCountUp = false
      this.status.onCountDown = false
      this.status.onFinish = false
      this.timeout = null
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
  beforeDestroy() {
    this.clear()
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
