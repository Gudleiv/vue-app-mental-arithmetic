<template>
  <b-card title="Регистрация">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Имя:"
        ><b-form-input
          :state="validateState('name')"
          v-model.lazy="name"
          type="text"
          placeholder=""
          @blur="$v.name.$touch()"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Email" description=""
        ><b-form-input
          :state="validateState('email')"
          v-model.lazy="email"
          @blur="$v.email.$touch()"
          type="email"
          placeholder="example@mail.ru"
          required
        ></b-form-input>
        <b-form-invalid-feedback>
          Укажите правильный адрес электронной почты
        </b-form-invalid-feedback>
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
        <b-form-invalid-feedback>
          Пароль должен состоять минимум из 6 символов
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Подтверждение пароля" description=""
        ><b-form-input
        :state="validateState('confirmPassword')"
          v-model="confirmPassword"
          @blur="$v.confirmPassword.$touch()"
          type="password"
          placeholder=""
          required
        ></b-form-input>
        <b-form-invalid-feedback>
          Пароли не совпадают!
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="row">
        <div class="col">
          <b-form-group label="Тип учетной записи" disabled>
            <b-form-radio checked="A" name="type" value="A"
              >Ученик</b-form-radio
            >
            <b-form-radio name="type" value="B">Преподаватель</b-form-radio>
          </b-form-group>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-auto">
          <b-button type="submit" variant="primary"
            >Зарегистрироваться</b-button
          >
        </div>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { required, email, minLength, maxLength, alpha, sameAs } from 'vuelidate/lib/validators'

export default {
  validations: {
    name: {
      alpha: (val) => /^[a-zа-яё ]*$/iu.test(val),
      minLength: minLength(2),
      maxLength: maxLength(32),
      required,
    },
    email: {
      email,
      required,
      maxLength: maxLength(320),
    },
    password: {
      minLength: minLength(6),
      maxLength: maxLength(128),
      required
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      type: ''
    }
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
          //name: this.name,
          //type: this.type
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            //this.$router.push('/')
          })
          .catch(() => {})
      } else {
        this.$v.$touch()
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
    validateStateParam(name, param) {
      const error = this.$v[name][param]
      return !error
    },
  },
}
</script>

<style scoped>
</style>
