<template>
  <b-input-group
      class="exercises-list"
  >
    <b-input-group-prepend is-text>
      <b-form-checkbox :checked="exercise.enabled" @change="toggle($event)" switch class="mr-n2">
      </b-form-checkbox>
    </b-input-group-prepend>
    <b-form-input
        ref="input"
        @keydown.esc="cancelEdit"
        @keydown.enter="save"
        v-model="$v.input.$model"
        :value="exercise.data"
        :disabled="disabled"
        :state="validate('input')"
    ></b-form-input>
    <input-control-buttons
        delButton
        v-if="!disabled"
        @save="save"
        @cancel="cancelEdit"
        @del="del"
    />
    <b-input-group-append v-else>
      <b-button variant="outline-primary" @click="edit">
        <b-icon icon="pencil" scale="0.9"></b-icon>
      </b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import InputControlButtons from '@/components/Controls/InputControlButtons'
import { required } from 'vuelidate/lib/validators'
import { validateState } from '@/utils'

export default {
  name: 'AbacusExercisesItem',
  created() {
    this.validate = validateState(this.$v)
  },
  props: {
    exercise: Object,
   },
  components: {
    InputControlButtons
  },
  data() {
    return {
      disabled: true,
      input: this.exercise.data
    }
  },
  methods: {
    toggle(event) {
      this.$emit('switch', event)
    },
    save() {
      if (!this.$v.input.$invalid) {
        this.$emit('update', this.input)
        this.disabled = true
        this.$v.input.$reset()
      } else {
        this.$v.input.$touch()
      }
    },
    edit() {
      this.disabled = false;
      this.$nextTick(() => this.$refs['input'].focus())
    },
    cancelEdit() {
      this.input = this.exercise.data
      this.disabled = true
      this.$v.input.$reset()
    },
    del() {
      this.$emit('del')
    },
  },
  validations: {
    input: {
      required,
      numeric: (val) => /^([-]?[\d]+[,]?)+$/.test(val),
    },
  }
}
</script>

<style>
.input-group.exercises-list {
  margin-bottom: 0.4rem;
}
</style>
