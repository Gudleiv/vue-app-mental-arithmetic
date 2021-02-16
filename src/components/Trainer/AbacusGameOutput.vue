<template>
  <div class="col-lg-8 col-md-10 mx-auto">
    <count-down-spinner
        v-show="status >= 10 & status < 20"
        ref="countdown"
        :counts="2"
    ></count-down-spinner>
    <template v-if="gameType === 'column'">
      <AbacusGameOutputColumnTable
          v-show="status >= 30"
          ref="column"
          :items="numbers"
          :key="gameKey"
          @end="toFinish"
      />
    </template>
    <template v-else-if="gameType === 'default'">
      <AbacusGameOutputNumber
          v-show="status === 30"
          :number="number"
          :numberKey="numberKey"/>
    </template>
    <div v-show="status === 40">
      <div :style="[gameType === 'default' ? {'height': '420px'} : '']" class="d-flex align-items-center justify-content-center">
        <div class="col-md-9">
          <AnswerForm
              :key="answerKey"
              :answer="answer"
              @next="nextGame"
              ref="answer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountDownSpinner from '@/components/CountDownSpinner'
import AbacusGameOutputColumnTable from '@/components/Trainer/AbacusGameOutputColumnTable'
import AbacusGameOutputNumber from '@/components/Trainer/AbacusGameOutputNumber'
import AnswerForm from '@/components/Trainer/AnswerForm'
import SoundNumbers from '@/services/sound'

function calcAnswer(numbers) {
  return numbers.reduce((acc, cv) => acc + cv, 0)
}

export default {
  name: 'AbacusGameOutput',
  components: {
    CountDownSpinner,
    AbacusGameOutputColumnTable,
    AbacusGameOutputNumber,
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
      sounds: null,
      gameKey: null,
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
      },
    },
    gameType() {
      return this.$store.getters.getGameType
    },
  },
  watch: {
    status(value) {
      switch (value) {
        case 20:
          this.restart()
          break
        case 22:
          this.end()
          break
      }
    },
  },
  methods: {
    drawGame() {
      const array = [...this.numbers]
      return new Promise((resolve) => {
        const next = () => {
          const num = array.shift()
          if (array.length) this.sounds.preLoadSound(array[0])
          if (!this.settings.muteSound) this.sounds.playSound(num, this.settings.volume)
          if (this.gameType === 'column') this.$refs.column.next()
          this.number = num
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
      this.status = 11
      await this.$refs.countdown.start()
      this.status = 30
      await this.drawGame()
      this.toFinish()
    },
    clear() {
      clearTimeout(this.timeout)
      this.status = 1
      this.timeout = null
      this.number = null
      this.numberKey = 0
      this.answerKey = Date.now()
      this.gameKey = Date.now()
    },
    toFinish() {
      clearTimeout(this.timeout)
      this.status = 40
      this.$refs.answer.focus()
    },
    end() {
      this.$emit('end')
      this.$destroy()
    },
    nextGame() {
      this.$parent.start(this.gameType)
    },
    prepare() {
      this.answer = calcAnswer(this.numbers)
      this.sounds = new SoundNumbers(this.numbers, this.lang)
    },
    async restart() {
      await this.start(700)
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
