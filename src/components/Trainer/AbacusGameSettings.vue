<template>
  <div>

    <div class="mx-auto">
      <count-down-spinner ref="countdown"></count-down-spinner>
    </div>
    <b-button variant="primary" @click="start">Start</b-button>
    <b-button variant="danger" @click="stop">Stop</b-button>
    <b-button variant="secondary" @click="restart">Restart</b-button>
  </div>
</template>

<script>
import CountDownSpinner from '@/components/CountDownSpinner'

export default {
  name: 'AbacusGameSettings',
  components: {
    CountDownSpinner,
  },
  methods: {
    start() {
      this.$refs.countdown.start()
    },
    stop() {
      this.$refs.countdown.stop()
    },
    restart() {
      this.$refs.countdown.restart()
    }
  },
}
</script>

<style>

</style>
