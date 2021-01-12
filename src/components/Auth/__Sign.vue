<template>
  <div>
    <div class="row justify-content-center">
      <div class="col my-3" style="max-width:480px">
        <div class="row justify-content-center">
          <div class="col-auto">
            <p>
              <b-link @click="switchForm"> {{ switchText }} </b-link>
            </p>
          </div>
        </div>
        <transition name="component-fade" mode="out-in">
          <LoginForm v-if="login" />
          <RegisterForm v-else />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from './SignInRegisterFrom'
import LoginForm from './SignInLoginForm'

export default {
  components: {
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      login: true,
      switchText: 'Регистрация',
      registrationText: 'Регистрация',
      loginText: 'Вход',
    }
  },
  methods: {
    switchForm() {
      this.login
        ? (this.switchText = this.loginText)
        : (this.switchText = this.registrationText)
      this.login = !this.login
    },
  },
}
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
