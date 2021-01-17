<template>
  <div>
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-form-checkbox switch class="mr-n2">
          <span class="sr-only">Enable ex.</span>
        </b-form-checkbox>
      </b-input-group-prepend>
      <b-form-input aria-label="Text input with switch"></b-form-input>
    </b-input-group>
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-form-checkbox switch class="mr-n2">
          <span class="sr-only">Enable ex.</span>
        </b-form-checkbox>
      </b-input-group-prepend>
      <b-form-input aria-label="Text input with switch"></b-form-input>
    </b-input-group>
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-icon icon="plus-circle" style="width: 28px"></b-icon>
      </b-input-group-prepend>
      <b-form-input
          v-model="$v.newEx.$model"

          type="text"
          :state="validateState('newEx')"
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Добавить</b-button>
      </b-input-group-append>
    </b-input-group>
    <div>

    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      newEx: ''
    }
  },
  validations: {
    newEx: {
      required,
      numeric: (val) => /^[0-9,-]*$/iu.test(val),
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
  }
}
</script>

<style scoped>

</style>
