<template>
  <b-card title="Вход">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Email" description=""
        ><b-form-input
          :state="validateState('email')"
          v-model.lazy="email"
          @blur="$v.email.$touch()"
          type="email"
          placeholder=""
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Пароль" description=""
        ><b-form-input
          :state="validateState('password')"
          v-model="password"
          type="password"
          @blur="$v.password.$touch()"
          placeholder=""
          required
        ></b-form-input>
      </b-form-group>

      <div class="row justify-content-end">
<!--        <div class="col mt-2 pl-3">
          <a class="text-secondary" href="#">Забыли пароль?</a>
        </div>-->
        <div class="col-auto">
          <b-overlay
            :show="loading"
            rounded="sm"
            opacity="0.6"
            spinner-small
            spinner-variant="primary"
            class="d-inline-block"
          ><b-button type="submit" variant="primary" :disabled="loading">Войти</b-button>
          </b-overlay>
        </div>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  created() {
    if (this.$route.query.required) {
      this.$store.dispatch('loginRequired', this.requiredMessage)
    }
  },
  data() {
    return {
      email: '',
      password: '',
      requiredMessage: 'Войдите для просмотра этой страницы'
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        }
        this.$store
          .dispatch('loginUser', user)
          .then(() => {
            this.$router.push({ name: 'Abacus'})
          })
          .catch(() => {})
      } else {
        this.$v.touch()
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
    showError() {

    }
  },
}
</script>

<style scoped>
.form-control.is-valid {
  background-image: none;
  border-color: rgba(69, 136, 85, 0.5);
}
</style>
