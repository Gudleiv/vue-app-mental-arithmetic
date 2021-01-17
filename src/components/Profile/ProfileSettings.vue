<template>
  <div>
    <b-input-group class="form">
      <template #prepend>
        <b-input-group-text><b-icon icon="person-lines-fill"></b-icon></b-input-group-text>
      </template>
      <b-form-input
          :disabled="name.formDisabled"
          :state="validateState('name')"
          v-model="name.value"
          type="text"
          @blur="$v.name.value.$touch()"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-primary" v-if="name.formDisabled" @click="editName"><b-icon font-scale="0.99" icon="pencil-fill"></b-icon></b-button>
        <b-button variant="outline-success" v-if="!name.formDisabled" @click="changeName"><b-icon font-scale="0.99" icon="check2"></b-icon> Сохранить</b-button>
        <b-button variant="outline-secondary" v-if="!name.formDisabled" @click="editName"><b-icon font-scale="0.99" icon="x-circle"></b-icon></b-button>
      </b-input-group-append>
    </b-input-group>

    <b-input-group class="form">
      <template #prepend>

        <b-input-group-text><b-icon icon="envelope"></b-icon></b-input-group-text>
      </template>
      <b-form-input
          :disabled="email.formDisabled"
          :state="validateState('email')"
          v-model="email.value"
          @blur="$v.email.value.$touch()"
          type="email"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-primary" v-if="email.formDisabled" @click="editEmail"><b-icon font-scale="0.99" icon="pencil-fill"></b-icon></b-button>
        <b-button variant="outline-success" v-if="!email.formDisabled" @click="changeEmail"><b-icon font-scale="0.99" icon="check2"></b-icon> Сохранить</b-button>
        <b-button variant="outline-secondary" v-if="!email.formDisabled" @click="editEmail"><b-icon font-scale="0.99" icon="x-circle"></b-icon></b-button>
      </b-input-group-append>
    </b-input-group>

    <b-input-group class="form">
      <template #prepend>
        <b-input-group-text><b-icon icon="key"></b-icon></b-input-group-text>
      </template>
      <b-form-input
          :disabled="password.formDisabled"
          :state="validateState('password')"
          v-model="password.value"
          type="password"
          @blur="$v.password.value.$touch()"
      ></b-form-input>
      <b-form-input
          :disabled="password.formDisabled"
          :state="validateState('password')"
          v-model="password.confirmValue"
          type="password"
          @blur="$v.password.confirmValue.$touch()"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-primary" v-if="password.formDisabled" @click="editPassword"><b-icon font-scale="0.99" icon="pencil-fill"></b-icon></b-button>
        <b-button variant="outline-success" v-if="!password.formDisabled" @click="changePassword"><b-icon font-scale="0.99" icon="check2"></b-icon> Сохранить</b-button>
        <b-button variant="outline-secondary" v-if="!password.formDisabled" @click="editPassword"><b-icon font-scale="0.99" icon="x-circle"></b-icon></b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { required, email, minLength, maxLength, alpha, sameAs } from 'vuelidate/lib/validators'

export default {
  created() {
    this.name.value = this.nameInitValue
    this.email.value = this.emailInitValue
  },
  data() {
    return {
      name: {
        formDisabled: true,
        value: '',
      },
      email: {
        formDisabled: true,
        value: '',
      },
      password: {
        formDisabled: true,
        value: '',
        confirmValue: ''
      },
    }
  },
  computed: {
    nameInitValue() { return this.$store.getters.user.name },
    emailInitValue() { return this.$store.getters.user.email }
  },
  methods: {
    editName() {
      this.name.formDisabled = !this.name.formDisabled
      this.name.value = this.nameInitValue
      this.$v.name.$reset()
    },
    editEmail() {
      this.email.formDisabled = !this.email.formDisabled
      this.email.value = this.emailInitValue
      this.$v.email.$reset()
    },
    editPassword() {
      this.password.formDisabled = !this.password.formDisabled
      this.password.value = this.password.confirmValue = ''
      this.$v.password.$reset()
    },
    changeName() {
      // TODO: trim name
      if (this.name.value === this.nameInitValue) {
        this.editName()
        return
      }
      if (!this.$v.name.$invalid) {
        const name = this.name.value
        this.$store.dispatch('updateUserInfo', { name })
            .then(() => {
              this.editName()
            })
            .catch(() => {
            })
      } else {
        this.$v.name.$touch()
      }
    },
    changeEmail() {
      if (this.email.value === this.emailInitValue) {
        this.editEmail()
        return
      }
      if (!this.$v.email.$invalid) {
        const email = this.email.value
        this.$store.dispatch('updateEmail', { email })
            .then(() => {
              this.editEmail()
            })
            .catch(() => {
            })
      } else {
        this.$v.email.$touch()
      }
    },
    changePassword() {
      if (!this.$v.password.$invalid) {
        const password = this.password.value
        this.$store.dispatch('updatePassword', { password })
            .then(() => {
              this.editPassword()
            })
            .catch(() => {
            })
      } else {
        this.$v.password.$touch()
      }
    },
    validateState(name) {
      const {  $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    }
  },
  validations: {
    name: {
      value: {
        alpha: (val) => /^[a-zа-яё ]*$/iu.test(val),
        minLength: minLength(2),
        maxLength: maxLength(32),
        required,
      }
    },
    email: {
      value: {
        email,
        required,
        maxLength: maxLength(320),
      }
    },
    password: {
      value: {
        minLength: minLength(6),
        maxLength: maxLength(128),
        required,
      },
      confirmValue: {
        sameAs: sameAs(function () {
          return this.password.value
        })
      }
    }
  },
}
</script>
<style scoped>
.form {
  margin-bottom: 1rem;
}

@media (max-width: 310px) {
  .form {
    align-items: flex-end;
    flex-direction: column;
  }
  .form .form-control {
    width: 100%;
  }
}

</style>
