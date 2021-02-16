<template>
  <div class="d-flex">
    <b-input
        @keydown.enter="submit"
        v-on="$listeners"
        v-bind="$attrs"
        v-model="value"
        ref="input"
        autocomplete="off"
        :disabled="disabled"
        :class="['input', result === 1 ? 'right' : result === 0 ? 'bad' : '']"
        size="lg"
        type="number"
        placeholder="Ответ"
    ></b-input>
    <b-button @click="nextExercise" id="answer-form-btn-next" v-show="disabled" class="ml-2 answer-form-btn-next" size="lg" variant="success">
      <b-icon icon="arrow-right"></b-icon>
    </b-button>
    <b-tooltip target="answer-form-btn-next" :delay="{ show: 600 }" placement="topleft">
      Следующий пример
    </b-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AnswerForm',
  props: {
    answer: {
      type: [Number, String],
      default: '',
    },
  },
  data() {
    return {
      value: '',
      result: null,
      disabled: false
    }
  },
  methods: {
    focus() {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    submit() {
      this.result = null
      setTimeout(() => {
        this.answer == this.value ? this.rightAnswer() : this.badAnswer()
      },0)
    },
    rightAnswer() {
      this.disabled = true
      this.result = 1
    },
    badAnswer() {
      this.result = 0
    },
    nextExercise() {
      this.$emit('next')
    }
  },
}
</script>

<style type="scss" scoped>
.input {
  text-align: center;
  height: 4.5rem;
  font-size: 2.5rem;
  font-family: 'Nanum Gothic Coding', monospace;
}

.right {
  animation-name: rightAnswerFormAnimation;
  animation-duration: 0.8s;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

.bad {
  animation-name: badAnswerFormAnimation;
  animation-duration: 0.4s;
}

.answer-form-btn-next {
  /*background-color: #49992b;*/
  transition: all .4s ease;
}

@keyframes rightAnswerFormAnimation {
  to {
    background-color: #49992b;
    color: white;
  }
}

@keyframes badAnswerFormAnimation {
  0% {
    transform: rotate(3deg);
  }
  25% {
    transform: rotate(-3deg);
  }
  50% {
    background-color: #861c1c;
    color: white;
    transform: rotate(3deg);
  }
  75% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
