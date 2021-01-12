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
          <div class="col mt-2 pl-3">
            <a class="text-secondary" href="#">Забыли пароль?</a>
          </div>
          <div class="col-auto">
            <b-button
            type="submit"
            variant="primary"
            >Войти</b-button
            >
          </div>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',

    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        }
        console.log(user);
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
  }
}
</script>

<style scoped>
.form-control.is-valid {
  background-image: none;
  border-color: rgba(69, 136, 85, 0.5);
}
</style>
