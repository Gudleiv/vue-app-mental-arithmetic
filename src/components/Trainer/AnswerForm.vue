<template>
  <div>
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
      this.$refs.input.focus()
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
  },
}
</script>

<style type="scss" scoped>
.input {
  text-align: center;
  height: 4.5rem;
  font-size: 2.5rem;
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
