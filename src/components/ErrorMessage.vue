<template>
  <div class="container" v-if="error">
    <div class="row justify-content-center">
        <div class="error">
            <b-alert
                fade
                variant="danger"
                :show="dismissCount"
                toaster="b-toaster-top-center"
                dismissible
                @dismiss-count-down="dismissCountDown"
                @dismissed="count=0"
            >
              {{ error }}
            </b-alert>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  data() {
    return {
      dismissSeconds: 5,
      dismissCount: 0
    }

  },
  methods: {
    dismissCountDown(newCount) {
      this.dismissCount = newCount
    }
  },
  computed: {
    error() {
      this.dismissCount = this.dismissSeconds
      return this.$store.getters.error
    },
  }
}
</script>

<style scoped>
  .error {
    position: absolute;
    top: 32px;
    margin: 8px;
    opacity: 0.92;
  }
</style>
