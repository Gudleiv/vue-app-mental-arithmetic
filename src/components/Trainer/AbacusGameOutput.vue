<template>
  <div class="col-lg-8 col-md-10 mx-auto">
    <count-down-spinner
        v-show="status === 10"
        ref="countdown"
        :counts="2"
    ></count-down-spinner>
    <svg
        style="overflow:visible"
        v-show="status === 30"
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
    <div v-show="status === 40" >
      <div style="height:300px" class="d-flex align-items-center justify-content-center">
        <div class="col-8">
          <AnswerForm
              :key="answerKey"
              :answer="answer"
              @end="end"
              ref="answer"
          />
        </div>
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
      timeout: null,
      answer: null,
      answerKey: 0,
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
    status: {
      get() {
        return this.$store.getters.getGameStatus
      },
      set(value) {
        this.$store.dispatch('setGameStatus', value)
      }
    }
  },
  watch: {
    status(value) {
      switch (value) {
        case 20: this.restart(); break;
        case 22: this.end(); break;
      }
    }
  },
  methods: {
    drawGame() {
      const array = [...this.numbers]
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
            if (array.length > 0) {
              next()
            } else {
              resolve()
            }
          }, this.delay)
        }
        next()
      })
    },
    async start(startToBeginTime = 500) {
      this.clear()
      this.prepare()
      this.status = 10
      await this.$refs.countdown.prepare(startToBeginTime)
      await this.$refs.countdown.start()
      this.status = 30
      await this.drawGame()
      this.status = 40
      this.$refs.answer.focus()
    },
    clear() {
      clearTimeout(this.timeout)
      this.status = 1
      this.timeout = null
      this.number = null
      this.numberKey = 0
      this.answerKey = Date.now()
    },
    end() {
      this.$emit('end')
      this.$destroy()
    },
    prepare() {
      this.answer = calcAnswer(this.numbers)
      console.log(this.answer, this.numbers)
      this.sounds = new SoundNumbers(this.numbers, this.lang)
    },
    async restart() {
      await this.start(900)
    },
  },
  beforeDestroy() {
    this.clear()
    this.status = 0
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
